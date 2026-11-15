'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { buildGmbAuthCallbackUrl, clearAllGmbCache, hasActiveGmbFlow } from '@/lib/gmbAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { z } from 'zod';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Navbar';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

export default function Auth() {
  const { user, roles, signIn, signUp, isLoading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');

  useEffect(() => {
    // Wait for auth to finish loading AND ensure user exists
    if (isLoading || !user || hasRedirected) return;

    // Check if there's an active GMB flow - don't redirect if so
    const isGmbFlow = hasActiveGmbFlow();

    if (isGmbFlow) {
      return;
    }

    // Redirect authenticated users away from auth page
    setHasRedirected(true);

    const isSuperAdmin = roles.includes('super_admin');
    const isAdmin = isSuperAdmin || roles.includes('platform_admin') || roles.includes('content_moderator');
    const isClinicStaff = roles.includes('clinic_owner') || roles.includes('clinic_manager') || roles.includes('receptionist');

    if (isSuperAdmin) {
      router.replace('/admin');
    } else if (isAdmin) {
      router.replace('/admin');
    } else if (isClinicStaff) {
      router.replace('/dashboard?tab=my-dashboard');
    } else if (roles.includes('dentist')) {
      router.replace('/dashboard?tab=my-dashboard');
    } else if (roles.length === 0) {
      router.replace('/onboarding?new=true');
    } else if (roles.includes('patient')) {
      router.replace('/patient-dashboard');
    } else {
      router.replace('/onboarding?new=true');
    }
  }, [user, roles, isLoading, router, hasRedirected]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      emailSchema.parse(loginEmail);
      passwordSchema.parse(loginPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    setIsSubmitting(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message.includes('Invalid login credentials') ? 'Invalid email or password' : error.message);
    } else {
      toast.success('Welcome back!');
      // Navigation will be handled by the useEffect after roles are loaded
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      emailSchema.parse(signupEmail);
      passwordSchema.parse(signupPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    setIsSubmitting(true);
    const { error } = await signUp(signupEmail, signupPassword, signupName);
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message.includes('already registered') ? 'This email is already registered. Please sign in.' : error.message);
    } else {
      toast.success('Account created successfully!');
      // Navigation will be handled by the useEffect after roles are loaded
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      clearAllGmbCache();

      const redirectTo = buildGmbAuthCallbackUrl();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in with Google');
      setIsGoogleLoading(false);
    }
  };

  // Set noindex for auth pages
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');

    return () => {
      meta?.setAttribute('content', 'index, follow');
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper" role="status" aria-label="Loading">
        <Loader2 className="h-8 w-8 animate-spin text-ink" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <Logo />
        <Link href="/" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to site
        </Link>
      </header>
      <main id="main" className="flex flex-1 items-start justify-center px-4 pb-12 pt-4 sm:items-center">
      <Card className="w-full max-w-md rounded-[1.5rem] border-black/10 shadow-none">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Log in to AppointPanda</h1>
          <CardDescription className="text-zinc-600">
            Sign in to manage your dental practice or your appointment requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Google Sign In Button */}
          <Button
            variant="outline"
            className="w-full mb-6 h-12 rounded-full border-black/15 text-base font-semibold"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <img
                src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png"
                alt=""
                className="h-5 w-5 mr-2"
              />
            )}
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-zinc-600">Or continue with email</span>
            </div>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid h-12 w-full grid-cols-2 rounded-full bg-paper p-1">
              <TabsTrigger value="login" className="rounded-full data-[state=active]:bg-white">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full data-[state=active]:bg-white">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-12"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="h-12"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="h-12 w-full rounded-full bg-ink text-base font-semibold text-white hover:bg-[#2a2a2a]" disabled={isSubmitting} aria-busy={isSubmitting}>
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Dr. John Smith"
                    autoComplete="name"
                    className="h-12"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-12"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="h-12"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="h-12 w-full rounded-full bg-ink text-base font-semibold text-white hover:bg-[#2a2a2a]" disabled={isSubmitting} aria-busy={isSubmitting}>
                  {isSubmitting ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      </main>
    </div>
  );
}
