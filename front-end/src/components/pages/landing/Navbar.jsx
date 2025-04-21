import { useState } from "react"

// icon library
import { FaGithub } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { RiMenu3Fill } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="">
      <div className="max-w-7xl mx-auto flex items-center justify-between ">
        {/* Logo */}
        <div className="flex items-center">
          Logo <BsFillSendFill />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 ">
          <a href="#" className="nav-link">
            Features
          </a>
          <a href="#" className="nav-link">
            About
          </a>
          <a href="#" className="nav-link">
            Developpers
          </a>
          <a href="#" className="nav-link">
            Contact
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://github.com/ueberdosis/tiptap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 text-2xl hover:text-gray-600 transition-colors"
            >
              <FaGithub />
            </a>
          </div>
          <a
            href="#"
            className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Sign up
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-xl font-bold cursor-pointer" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? (
              <RiMenu3Fill />
            ) : (
              <VscChromeClose />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {
        isOpen && (
          <div className="md:hidden mt-4 px-2 pt-2 pb-4 space-y-1">
            <a href="" className="block px-3 py-2 rounded-md text-gray-800 hover:bg-gray-100">
              Features
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-gray-800 hover:bg-gray-100">
              About
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-gray-800 hover:bg-gray-100">
              Developpers
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-gray-800 hover:bg-gray-100">
              Contact
            </a>
            <div className="pt-4 border-t border-gray-200">
              <a href="#" className="mt-2 block px-3 py-2 rounded-md bg-black text-white text-center">
                Sign in
              </a>
            </div>
          </div>
        )
      }
    </div >
  )
}
