"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    message: "",
    agree: false,
  });

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.currentTarget;
  const checked = (e.currentTarget as HTMLInputElement).checked;
  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add API call here
  };

  return (
    <div className="min-h-screen  text-black flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">
        {/* Left Section */}
        <div>
          <h2 className="text-sm uppercase text-black">Contact Us</h2>
          <h1 className="text-3xl font-bold mt-2">Get in Touch with Us</h1>
          <p className="mt-4 text-black text-sm">
            We’re here to help. Whether you’re interested in learning more about
            our services or need support, we’re happy to assist you.
          </p>

          <ul className="mt-6 space-y-3 text-black">
            <li>✅ Reliable </li>
            <li>✅ Good Customer service</li>
            {/* <li>✅ Reliable Security</li> */}
            <li>✅ 24/7  availiability  </li>
            {/* <li>✅ Seamless Integration</li> */}
          </ul>

          <div className="mt-8 text-sm">
            <p><span className="font-semibold">Phone:</span> +234-8137167298</p>
            <p><span className="font-semibold">Email:</span> ife.folorunsho@gvss.ng</p>
            <p>
              <span className="font-semibold">Location:</span> 90, Allen Avenue Ikeja Lagos 
            </p>
          </div>
        </div>

        {/* Right Section */}
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              className="w-1/2 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-gray-600"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-gray-600"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-gray-600"
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-gray-600"
          />

         <select
         name="role"
         value={formData.role}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-gray-600"
        >
          <option value="" disabled hidden>
           Which best describes you?
          </option>
          <option value="investor">Investor</option>
          <option value="tourist">Tourist</option>
          <option value="business">Business Owner</option>
          <option value="student">Student</option>
        </select>

          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            className="w-full h-28 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-gray-600"
          />

          <label className="flex items-center space-x-2 text-sm">
           <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
                onChange={handleChange}
            className="w-4 h-4 accent-[#dd5500] bg-gray-800 border-gray-700 rounded"
          />
            <span className="text-white">
              I agree to GVSSL <a href="#" className="text-[#dd5500] "> Terms of Use </a> and{" "}
              <a href="#" className="text-[#dd5500]">Privacy Policy</a>
            </span>
          </label>

          <button
            type="submit"
          disabled={!formData.agree}
         className={`w-full font-semibold py-3 rounded-lg transition 
            ${formData.agree ? "bg-[#dd5500] text-white hover:bg-[#c54400]" : "bg-gray-600 text-gray-300 cursor-not-allowed"}`}
        >
  Submit
</button>
        </form>
      </div>
    </div>
  );
}
