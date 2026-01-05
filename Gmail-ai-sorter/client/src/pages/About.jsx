import React from "react";

const About = () => {
  return (
    <div className="min-h-[calc(100vh-56px-56px)] gradient-bg">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-50 mb-6">
            About Gmail AI Sorter
          </h2>

          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">

            {/* PROJECT IDEA */}
            <section>
              <h3 className="text-slate-100 font-semibold mb-2">
                Project Idea
              </h3>
              <p>
                Gmail AI Sorter is built to address a common real-world problem —
                managing a cluttered inbox. Instead of displaying emails as raw
                data, the system converts them into a structured and visual
                overview. The goal is to help users quickly understand their
                inbox patterns without manually opening or reading every email.
              </p>
            </section>

            {/* GOOGLE APIs */}
            <section>
              <h3 className="text-slate-100 font-semibold mb-2">
                Google APIs Integration
              </h3>
              <p>
                The application uses Google OAuth 2.0 for secure authentication
                and explicit user consent. Email access is handled through the
                Gmail API in read-only mode, fetching only essential metadata
                such as subject, snippet, and received date. This ensures strong
                privacy protection while still enabling meaningful analysis.
              </p>
            </section>

            {/* GEMINI AI */}
            <section>
              <h3 className="text-slate-100 font-semibold mb-2">
                Gemini AI–Based Classification
              </h3>
              <p>
                Gemini AI analyzes recent emails using a structured JSON input
                format. Based on content patterns, emails are categorized into
                practical groups such as Education, Finance, Jobs, Social, and
                Updates. These AI-generated categories directly drive the visual
                charts and the organized email list, allowing users to gain
                insights at a glance.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
