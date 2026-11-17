"use client";

import { useState } from "react";
import { contact, services } from "@/data/site";

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const nextErrors: Record<string, string> = {};
    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const topic = (data.topic || "").trim();
    const budget = (data.budget || "").trim();
    const message = (data.message || "").trim();

    if (name.length < 2) nextErrors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email.";
    }
    if (message.length < 20) {
      nextErrors.message = "Describe your project (20+ characters).";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || data.website) return;

    const enquiry = [
      "Hello, I'd like to enquire about a project.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Topic: ${topic || "-"}`,
      `Service: ${data.service}`,
      `Budget: ${budget || "-"}`,
      "",
      message,
    ].join("\n");
    const phone = contact.whatsapp.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(enquiry)}`;

    window.location.assign(whatsappUrl);
  }

  const inputClass =
    "w-full border-b border-[var(--line)] bg-transparent py-3 text-base outline-none focus:border-white";

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      {[
        ["name", "Name", "text"],
        ["email", "Your email", "email"],
        ["topic", "What is it about? (optional)", "text"],
      ].map(([name, label, type]) => (
        <label key={name} className="grid gap-1 text-xs tracking-wider text-[var(--mute)]">
          {label.toUpperCase()}
          <input
            name={name}
            type={type}
            className={inputClass}
            aria-invalid={Boolean(errors[name])}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
          />
          {errors[name] && (
            <span id={`${name}-error`} className="text-white/70">
              {errors[name]}
            </span>
          )}
        </label>
      ))}
      <label className="grid gap-1 text-xs tracking-wider text-[var(--mute)]">
        SERVICE REQUIRED
        <select name="service" className={inputClass} defaultValue={services[0]?.title}>
          {services.map((service) => (
            <option key={service.slug} className="bg-black">
              {service.title}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-xs tracking-wider text-[var(--mute)]">
        BUDGET (OPTIONAL)
        <input name="budget" className={inputClass} />
      </label>
      <label className="grid gap-1 text-xs tracking-wider text-[var(--mute)]">
        PROJECT DESCRIPTION
        <textarea
          name="message"
          rows={5}
          className={inputClass}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span id="message-error" className="text-white/70">
            {errors.message}
          </span>
        )}
      </label>
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden="true"
      />
      <p className="text-sm text-[var(--mute)]">
        Submitting opens WhatsApp with your enquiry ready for you to review and send.
      </p>
      <button type="submit" className="btn p w-fit">
        SEND VIA WHATSAPP
      </button>
    </form>
  );
}
