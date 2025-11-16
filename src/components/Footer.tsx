import { Link, Code } from '@/components/ui'
import { Github, Twitter } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold font-mono text-primary mb-4">About</h3>
            <p className="text-sm text-muted-foreground">
              A modern WYSIWYG editor with a terminal-inspired design system.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold font-mono text-primary mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold font-mono text-primary mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground font-mono">
            <Code>Built with TipTap, React, and Tailwind CSS</Code>
          </p>
        </div>
      </div>
    </footer>
  )
}
