import React, { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { submitHubSpotForm, HUBSPOT_FORMS } from '@/services/hubspotForms';

/**
 * Native newsletter signup submitting to HubSpot (single email field).
 * variant="light" for white/light cards, variant="dark" for dark gradient panels.
 */
const NewsletterSignupForm = ({ variant = 'light', className }) => {
  const dark = variant === 'dark';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const result = await submitHubSpotForm(HUBSPOT_FORMS.newsletter, { email });
      setStatus(result.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        className={cn(
          'flex items-center justify-center space-x-3 rounded-lg p-4',
          dark ? 'bg-white/10 text-white' : 'bg-green-50 border border-green-200 text-gray-800',
          className
        )}
        role="status"
      >
        <CheckCircle className={cn('h-6 w-6 flex-shrink-0', dark ? 'text-green-300' : 'text-green-600')} />
        <p className="font-semibold">Thank you for subscribing! Please check your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${variant}`}
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            'flex-1 min-h-[48px] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-colors',
            dark
              ? 'bg-white/10 border border-white/30 text-white placeholder-blue-200 focus:ring-white/60'
              : 'bg-white border border-gray-300 text-dark-gray placeholder-gray-400 focus:ring-steel-blue focus:border-steel-blue'
          )}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={cn(
            'min-h-[48px] px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2',
            dark
              ? 'bg-white text-steel-blue hover:bg-blue-50 focus:ring-white/60'
              : 'bg-steel-blue text-white hover:bg-steel-blue/90 focus:ring-steel-blue'
          )}
        >
          {status === 'submitting' ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Mail className="h-5 w-5 mr-2" />
              Subscribe
            </>
          )}
        </button>
      </div>

      {status === 'error' && (
        <div
          className={cn(
            'mt-3 flex items-center space-x-2 text-sm rounded-lg p-3',
            dark ? 'bg-red-500/20 text-red-100' : 'bg-red-50 border border-red-200 text-red-700'
          )}
          role="alert"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>
            Subscription failed. Please try again or email{' '}
            <a href="mailto:info@taxed.ch" className="underline font-semibold">info@taxed.ch</a>.
          </span>
        </div>
      )}
    </form>
  );
};

export default NewsletterSignupForm;
