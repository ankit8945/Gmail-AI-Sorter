import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-[calc(100vh-56px-56px)] gradient-bg">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-50 mb-6">
            Privacy Policy
          </h2>

          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">

            {/* INTRODUCTION */}
            <section>
              <p>
                Gmail AI Sorter is an AI-powered email analysis and
                categorization tool designed to help users understand and
                organize their inbox efficiently. We respect user privacy and
                are committed to handling all data securely and responsibly.
              </p>
            </section>

            {/* GOOGLE USER DATA */}
            <section>
              <h3 className="text-slate-100 font-semibold mb-2">
                Google User Data Access
              </h3>
              <p>
                The application uses Google OAuth 2.0 to request explicit user
                consent before accessing any Gmail data. Access is limited to
                read-only permissions and is used strictly for email analysis
                and categorization purposes.
              </p>
            </section>

            {/* DATA PROCESSING */}
            <section>
              <h3 className="text-slate-100 font-semibold mb-2">
                Data Processing & Storage
              </h3>
              <p>
                Email data, including subject lines and content snippets, is
                processed temporarily to generate insights and visual
                summaries. Gmail AI Sorter does not permanently store, sell, or
                share email data with third parties.
              </p>
            </section>

            {/* DATA USAGE */}
            <section>
              <h3 className="text-slate-100 font-semibold mb-2">
                How We Use Your Data
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Email categorization and visualization</li>
                <li>Generating insights about inbox patterns</li>
                <li>Improving AI classification accuracy</li>
              </ul>
            </section>

            {/* USER CONTROL */}
            <section>
              <h3 className="text-slate-100 font-semibold mb-2">
                User Control & Permissions
              </h3>
              <p>
                Users can revoke Gmail access at any time from their Google
                Account settings. Once access is revoked, no further email data
                is processed by the application.
              </p>
            </section>

            {/* CONTACT */}
            <section>
              <h3 className="text-slate-100 font-semibold mb-2">
                Contact Information
              </h3>
              <p>
                For any privacy-related questions or concerns, please contact
                us at:
              </p>
              <p className="mt-2">
                📧 hackathon.teamhexa@gmail.com <br />
                📧 teamhexa03@gmail.com
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
