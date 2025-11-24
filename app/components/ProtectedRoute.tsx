'use client';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated()) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
}