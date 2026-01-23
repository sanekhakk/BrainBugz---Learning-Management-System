// src/components/Footer.jsx - Ultra Modern Footer
import React from "react";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png"
import { Mail, Briefcase, Github, Twitter, Linkedin, Heart } from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Our Team", href: "#team" },
        { name: "Careers", href: "https://forms.gle/YOUR_GOOGLE_FORM_LINK", external: true },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Private Mentorship", href: "#services" },
        { name: "Masterclass Groups", href: "#services" },
        { name: "Coding Labs", href: "#services" },
        { name: "Pricing", href: "#pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#blog" },
        { name: "Documentation", href: "#docs" },
        { name: "Help Center", href: "#help" },
        { name: "Privacy Policy", href: "#privacy" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer
      className="relative border-t overflow-hidden"
      style={{
        backgroundColor: COLORS.bgPrimary,
        borderColor: COLORS.glassBorder,
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: GRADIENTS.primary }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: GRADIENTS.secondary }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full blur-xl opacity-50"
                      style={{ background: GRADIENTS.primary }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <img
                      src={Logo}
                      alt="Pearlx Logo"
                      className="h-12 w-12 relative z-10"
                    />
                  </div>
                  <span className="text-2xl font-bold text-white">Pearlx web studio</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                  Transform your Computer Science journey with personalized mentorship from
                  industry experts. Fix. Learn. Level up.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <motion.a
                    href="mailto:support@brainbugz.com"
                    whileHover={{ x: 5 }}
                    className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors group"
                  >
                    <div
                      className="p-2 rounded-lg mr-3 group-hover:bg-cyan-500/10 transition-colors"
                      style={{
                        background: COLORS.glassBg,
                        border: `1px solid ${COLORS.glassBorder}`,
                      }}
                    >
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm">support@brainbugz.com</span>
                  </motion.a>

                  <motion.a
                    href="https://forms.gle/YOUR_GOOGLE_FORM_LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center text-gray-400 hover:text-amber-400 transition-colors group"
                  >
                    <div
                      className="p-2 rounded-lg mr-3 group-hover:bg-amber-500/10 transition-colors"
                      style={{
                        background: COLORS.glassBg,
                        border: `1px solid ${COLORS.glassBorder}`,
                      }}
                    >
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Career Opportunities</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Links Columns */}
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-white font-bold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        target={link.external ? "_blank" : "_self"}
                        rel={link.external ? "noopener noreferrer" : ""}
                        whileHover={{ x: 5 }}
                        className="text-sm text-gray-400 hover:text-white transition-colors inline-block"
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="py-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          style={{ borderColor: COLORS.glassBorder }}
        >
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500"
          >
            <span className="flex items-center">
              © {currentYear} Pearlx. Made with{" "}
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mx-1"
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.span>{" "}
              for students
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl border hover:border-cyan-500/50 transition-all group"
                style={{
                  background: COLORS.glassBg,
                  borderColor: COLORS.glassBorder,
                }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;