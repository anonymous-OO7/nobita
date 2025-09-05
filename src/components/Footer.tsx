import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@heroui/react";
import { FaTelegramPlane, FaLinkedin } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-[#041a2f] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Products */}
          {/* <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">
                  <span className="hover:underline">Overview</span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="hover:underline">Solutions</span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="hover:underline">Pricing</span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="hover:underline">Customers</span>
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" onClick={() => router.push("/about")}>
                  <span className="hover:underline">About</span>
                </Link>
              </li>
              {/* <li>
                <Link href="#">
                  <span className="hover:underline">Investor Relations</span>
                </Link>
              </li> */}
              <li>
                <Link
                  href="/dashboard"
                  onClick={() => router.push("/dashboard")}
                >
                  <span className="hover:underline">Jobs</span>
                </Link>
              </li>
              {/* <li>
                <Link href="#">
                  <span className="hover:underline">Press</span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="hover:underline">Blog</span>
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" onClick={() => router.push("/contact")}>
                  <span className="hover:underline">Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" onClick={() => router.push("/pricing")}>
                  <span className="hover:underline">Pricing</span>
                </Link>
              </li>
              {/* <li>
                <Link href="#">
                  <span className="hover:underline">Documentation</span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="hover:underline">Chat</span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="hover:underline">FAQ</span>
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms-and-conditions"
                  onClick={() => router.push("/terms-and-conditions")}
                >
                  <span className="hover:underline">Terms and conditions</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacypolicy"
                  onClick={() => router.push("/privacypolicy")}
                >
                  <span className="hover:underline">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-refundpolicy"
                  onClick={() => router.push("/cancellation-refundpolicy")}
                >
                  <span className="hover:underline">
                    Cancellation and refund
                  </span>
                </Link>
              </li>
              {/* <li>
                <Link href="#">
                  <span className="hover:underline">Cookie settings</span>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        {/* <div className="mt-12 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="mb-6 md:mb-0">
            <h5 className="font-semibold text-lg">Stay up to date</h5>
            <p className="text-sm text-gray-300">Subscribe to our newsletter</p>
          </div>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-full bg-white/10 text-white placeholder-white/60 border-white/20"
            />
            <Button className="rounded-full bg-white text-[#041a2f] hover:bg-gray-200 transition">
              Subscribe
            </Button>
          </form>
        </div> */}

        {/* Social icons and copyright */}
        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Workist. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://www.linkedin.com/company/workistai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://t.me/+bBTTpSFwb2Q0ZjZl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Telegram"
            >
              <FaTelegramPlane size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
