import React from "react";

const Contact = () => {
  return (
    <div className="min-h-[calc(100vh-56px-56px)] gradient-bg">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-slate-50 mb-4">
            Contact
          </h2>

          <div className="space-y-4 text-sm text-slate-300">
            <p>
              For feedback, collaboration, or project-related queries,
              feel free to connect with us using the details below.
            </p>

            {/* EMAIL */}
            <div>
              <p className="font-medium text-slate-100">Email</p>
              <a
                href="mailto:hackathon.teamhexa@gmail.com"
                className="text-blue-400 hover:underline"
              >
                hackathon.teamhexa@gmail.com
              </a>
              <br />
              <a
                href="mailto:teamhexa03@gmail.com"
                className="text-blue-400 hover:underline"
              >
                teamhexa03@gmail.com
              </a>
            </div>

            {/* GITHUB */}
            <div>
              <p className="font-medium text-slate-100">GitHub</p>
              <a
                href="https://github.com/ankit8945/Gmail-AI-Sorter"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                github.com/ankit8945/Gmail-AI-Sorter
              </a>
            </div>

            {/* LINKEDIN */}
            <div>
              <p className="font-medium text-slate-100">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/ankitkumar8945/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                linkedin.com/in/ankitkumar8945
              </a>
              <br />
              <a
                href="https://www.linkedin.com/in/raj-undefined-931a24397/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                linkedin.com/in/raj-undefined
              </a>
              <br />
              <a
                href="https://www.linkedin.com/in/avilash-saha-200629391/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                linkedin.com/in/avilash-saha
              </a>
            </div>
               <div>
              <p className="font-medium text-slate-100">Instagram</p>
              <a
                href="https://www.instagram.com/teamhexa.lab/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                @teamhexa.lab
              </a>
              <br />
            </div>

            {/* TEAM */}
            <div>
              <p className="font-medium text-slate-100">Team</p>
              <p>Team Hexa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


