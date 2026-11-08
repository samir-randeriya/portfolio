import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import portfolioData from '../data/portfolioContent.json';
import { SECTION_IDS } from '../constants';
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  isEmailConfigured,
} from '../constants/env';
import { Button, Card, Input, Section, SectionHeader, Textarea } from '../components/ui';

export default function Contact() {
  const { contact, personal } = portfolioData;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailConfigured) {
      window.location.href = `mailto:${personal.email}?subject=Hello from ${encodeURIComponent(
        form.name || 'portfolio'
      )}&body=${encodeURIComponent(form.message)}`;
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section id={SECTION_IDS.CONTACT}>
      <SectionHeader
        number={contact.number}
        label={contact.label}
        title={contact.title}
        path={contact.path}
        meta={
          <span className="text-accent inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {contact.replySla}
          </span>
        }
      >
        {contact.subtitle || null}
      </SectionHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <dl className="space-y-4">
            {(contact.contactInfo || []).map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[11px] tracking-widest uppercase text-ink-faint">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm text-ink-bright">
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.link.startsWith('http') ? '_blank' : undefined}
                      rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="hover:text-accent transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
            <div>
              <dt className="font-mono text-[11px] tracking-widest uppercase text-ink-faint">
                Status
              </dt>
              <dd className="mt-1 text-sm text-accent">{contact.availability?.status}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-widest uppercase text-ink-faint">
                Stack
              </dt>
              <dd className="mt-1 text-sm text-ink-bright">{contact.stackLine}</dd>
            </div>
          </dl>
        </div>

        <Card className="p-5 sm:p-6">
          <h3 className="font-mono text-xs tracking-widest uppercase text-ink-faint mb-5">
            {contact.form?.title || 'Start a conversation'}
          </h3>

          <form className="space-y-4" onSubmit={onSubmit}>
            <Input
              id="name"
              name="name"
              label="Name *"
              required
              value={form.name}
              onChange={onChange}
              autoComplete="name"
            />
            <Input
              id="email"
              name="email"
              type="email"
              label="Email *"
              required
              value={form.email}
              onChange={onChange}
              autoComplete="email"
            />
            <Textarea
              id="msg"
              name="message"
              label="Message *"
              required
              placeholder="What are you building?"
              value={form.message}
              onChange={onChange}
            />

            <Button type="submit" variant="primary" disabled={status === 'sending'} className="w-full sm:w-auto">
              {status === 'sending'
                ? contact.form?.submittingText || 'sending...'
                : contact.form?.submitText || 'send message'}
            </Button>

            {status === 'sent' && (
              <p className="font-mono text-xs text-accent">{contact.form?.successMessage}</p>
            )}
            {status === 'error' && (
              <p className="font-mono text-xs text-red-400">
                Couldn&apos;t send. Email {personal.email} directly.
              </p>
            )}
          </form>
        </Card>
      </div>
    </Section>
  );
}
