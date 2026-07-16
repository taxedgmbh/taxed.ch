import React, { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { submitHubSpotForm, HUBSPOT_FORMS } from '@/services/hubspotForms';

const inputClasses =
  'w-full min-h-[44px] px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-dark-gray placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-steel-blue focus:border-steel-blue transition-colors';

const Field = ({ id, label, required, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label}
      {required && <span className="text-brand-red ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

/**
 * Native contact/onboarding form submitting to HubSpot.
 * Mirrors the fields of HubSpot form "contact" (email, name, address, phone, message).
 */
const HubSpotContactForm = ({ className }) => {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    zip: '',
    city: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      const result = await submitHubSpotForm(HUBSPOT_FORMS.contact, values);
      if (result.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(result.message || '');
      }
    } catch {
      setStatus('error');
      setErrorMessage('');
    }
  };

  if (status === 'success') {
    return (
      <div className={cn('bg-green-50 border border-green-200 rounded-xl p-8 text-center', className)}>
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h3>
        <p className="text-gray-600">
          Your request has been received. We will contact you within one business day to get started.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-5', className)} noValidate={false}>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="hs-firstname" label="First name" required>
          <input id="hs-firstname" name="firstname" type="text" autoComplete="given-name" required
            value={values.firstname} onChange={handleChange} className={inputClasses} />
        </Field>
        <Field id="hs-lastname" label="Last name" required>
          <input id="hs-lastname" name="lastname" type="text" autoComplete="family-name" required
            value={values.lastname} onChange={handleChange} className={inputClasses} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="hs-email" label="Email" required>
          <input id="hs-email" name="email" type="email" autoComplete="email" required
            value={values.email} onChange={handleChange} className={inputClasses} placeholder="you@example.com" />
        </Field>
        <Field id="hs-phone" label="Phone number" required>
          <input id="hs-phone" name="phone" type="tel" autoComplete="tel" required
            value={values.phone} onChange={handleChange} className={inputClasses} placeholder="+41 79 000 00 00" />
        </Field>
      </div>

      <Field id="hs-company" label="Company name">
        <input id="hs-company" name="company" type="text" autoComplete="organization"
          value={values.company} onChange={handleChange} className={inputClasses} placeholder="Optional" />
      </Field>

      <Field id="hs-address" label="Street address" required>
        <input id="hs-address" name="address" type="text" autoComplete="street-address" required
          value={values.address} onChange={handleChange} className={inputClasses} />
      </Field>

      <div className="grid grid-cols-[1fr_2fr] gap-5">
        <Field id="hs-zip" label="Postal code" required>
          <input id="hs-zip" name="zip" type="text" inputMode="numeric" autoComplete="postal-code" required
            value={values.zip} onChange={handleChange} className={inputClasses} />
        </Field>
        <Field id="hs-city" label="Municipality" required>
          <input id="hs-city" name="city" type="text" autoComplete="address-level2" required
            value={values.city} onChange={handleChange} className={inputClasses} />
        </Field>
      </div>

      <Field id="hs-message" label="Message">
        <textarea id="hs-message" name="message" rows={4}
          value={values.message} onChange={handleChange}
          className={cn(inputClasses, 'resize-y min-h-[110px]')}
          placeholder="Tell us briefly about your tax situation (optional)" />
      </Field>

      {status === 'error' && (
        <div className="flex items-start space-x-3 bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">
            {errorMessage || 'Something went wrong sending your request.'}{' '}
            Please try again or email us directly at{' '}
            <a href="mailto:info@taxed.ch" className="font-semibold underline">info@taxed.ch</a>.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full min-h-[48px] bg-steel-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue/90 focus:outline-none focus:ring-2 focus:ring-steel-blue focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-5 w-5 mr-2" />
            Get My Free Consultation
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        We only use your details to respond to your request. See our{' '}
        <a href="/privacy-policy" className="underline hover:text-steel-blue">privacy policy</a>.
      </p>
    </form>
  );
};

export default HubSpotContactForm;
