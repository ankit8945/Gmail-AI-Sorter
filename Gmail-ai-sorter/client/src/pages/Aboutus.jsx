import React from "react";
import ankitPhoto from "../assets/ankit.jpeg";
import soumarupPhoto from "../assets/soumarup.jpeg";
import avilashPhoto from "../assets/avilash.jpeg";

const teamMembers = [
  {
    name: "Ankit Kumar",
    photo: ankitPhoto,
    linkedin: "https://www.linkedin.com/in/ankitkumar8945/"
  },
  {
    name: "Soumarup Das",
    photo: soumarupPhoto,
    linkedin: "https://www.linkedin.com/in/raj-undefined-931a24397/"
  },
  {
    name: "Avilash Saha",
    photo: avilashPhoto,
    linkedin: "https://www.linkedin.com/in/avilash-saha-200629391/"
  }
];

const AboutUs = () => {
  return (
    <div className="min-h-[calc(100vh-56px-56px)] gradient-bg">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-50 mb-2">
            About Us
          </h2>

          <p className="text-sm text-slate-300 mb-8 max-w-3xl">
            We are a team of three core members who designed and built Gmail AI
            Sorter as a complete full-stack solution. Our focus is on solving
            real-world problems using clean architecture, secure integrations,
            and thoughtful user experience.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5 text-center"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-28 w-28 mx-auto rounded-full object-cover border border-slate-600 mb-4"
                />

                <h3 className="text-slate-100 font-semibold">
                  {member.name}
                </h3>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-sm text-blue-400 hover:underline"
                >
                  View LinkedIn
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
