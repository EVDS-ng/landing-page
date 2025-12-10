import Image from "next/image";
import Container from "../ui/Container";
import { motion } from "framer-motion";

interface FooterProps {
  content: {
    links: string;
    social: string;
    copyright: string;
  };
}

export default function Footer({ content }: FooterProps) {
  const footerLinks = content.links.split(" | ").map((link) => link.trim());
  const socialLinks = content.social.split(" | ").map((link) => link.trim());

  return (
    <footer className="bg-primary text-white py-16">
      <Container>
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-4">
                   <Image
                             src="/images/Logo.png"
                             alt="Everyday Surprises Logo"
                             width={120}
                             height={32}
                             className="w-[120px] h-auto"
                           />
               
              </div>
              <p className="text-white/80">
                Making birthdays unforgettable for Nigerians, one celebration at
                a time.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {footerLinks.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-white/80 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <span className="text-sm">{social.charAt(0)}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/20 mt-12 pt-8 text-center"
        >
          <p className="text-white/80">{content.copyright}</p>
        </motion.div>
      </Container>
    </footer>
  );
}
