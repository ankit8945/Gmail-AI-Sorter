import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-[calc(100vh-56px-56px)] gradient-bg">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-50 mb-6">
            Terms of Service
          </h2>

          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">

            {/* INTRODUCTION */}
            <section>
              <p>
                By accessing or using Gmail AI Sorter, you agree to comply with
                and be bound by these Terms of Service. If you do not agree with
                any part of these terms, you should discontinue use of the
                application.
              </p>
            </section>

            {/* SERVICE DESCRIPTION */}
            <section>
              <h3 className="text-slate-100 font-semibold mb-2">
                Service Description
              </h3>
              <p>
                Gmail AI Sorter is an AI-powered tool designed to analyze and
                categorize emails to help users better understand and manage
                their inbox. The service relies on Google OAuth authentication
                and read-only Gmail access.
              </p>
            </section>

            {/* USER RESPONSIBILITIES */}
            <section>
              <h3 className="text-slate-100 font-semibold mb-2">
                User Responsibilities
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Use the application for lawful purposes only</li>
                <li>Do not attempt to misuse, exploit, or disrupt the service</li>
                <li>Do not attempt unauthorized access to systems or data</li>
              </ul>
            </section>

            {/* DATA HANDLING */}
            <section>
              <h3 className="text-slate-100 font-semibold mb-2">
                Data Handling
              </h3>
              <p>
                By using this service, you consent to the temporary processing
                of your email data strictly for analysis and categorization.
                Gmail AI Sorter does not permanently store or sell user email
                data.
              </p>
            </section>

            {/* LIMITATION OF LIABILITY */}
            <section>
              <h3 className="text-slate-100 font-semibold mb-2">
                Limitation of Liability
              </h3>
              <p>
                The service is provided on an “as is” and “as available” basis.
                Gmail AI Sorter is not responsible for any incorrect email
                categorization, data loss, or issues arising from external
                services such as Gmail or network availability.
              </p>
            </section>

            {/* MODIFICATIONS */}
            <section>
              <h3 className="text-slate-100 font-semibold mb-2">
                Modifications to Terms
              </h3>
              <p>
                We reserve the right to update or modify these Terms of Service
                at any time. Continued use of the application after changes
                implies acceptance of the updated terms.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
