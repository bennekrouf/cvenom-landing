'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail } from 'react-icons/fi';

interface FormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (typeof window !== 'undefined' && window.plausible) {
        window.plausible('Contact Form Submit', {
          props: {
            source: 'contact_page'
          }
        });
      }

      const apiUrl = process.env.NODE_ENV === 'production'
        ? 'https://gateway.api0.ai/api/contact'
        : 'http://0.0.0.0:5009/api/contact';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  if (formSubmitted) {
    return (
      <div className="bg-accent p-8 rounded-xl border border-border text-center">
        <div className="text-[#FF6B00] text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-bold mb-4">Message Sent Successfully!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. We'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setFormSubmitted(false)}
          className="btn-primary"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-accent p-8 rounded-xl border border-border"
    >
      <div className="flex items-center gap-3 mb-6">
        <FiMail className="h-6 w-6 text-[#FF6B00]" />
        <h2 className="text-2xl font-bold">Send a Message</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <label htmlFor="name" className="font-medium">
            Name <span className="text-[#FF6B00]">*</span>
          </label>
          <input
            id="name"
            className="w-full p-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-colors"
            placeholder="John Doe"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="text-sm text-[#FF6B00]">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="font-medium">
            Email <span className="text-[#FF6B00]">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-colors"
            placeholder="john@company.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-[#FF6B00]">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <label htmlFor="company" className="font-medium">
          Company (Optional)
        </label>
        <input
          id="company"
          className="w-full p-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-colors"
          placeholder="Company Name"
          {...register('company')}
        />
      </div>

      <div className="space-y-2 mb-6">
        <label htmlFor="message" className="font-medium">
          Message <span className="text-[#FF6B00]">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full p-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-colors"
          placeholder="How can Cvenom help optimize your CV and career prospects?"
          {...register('message', { required: 'Message is required' })}
        />
        {errors.message && (
          <p className="text-sm text-[#FF6B00]">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-3 rounded-lg bg-[#FF6B00] text-white font-medium hover:bg-[#FF6B00]/90 transition-colors disabled:opacity-70"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
