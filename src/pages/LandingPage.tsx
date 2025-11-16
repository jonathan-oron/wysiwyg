import { Link } from 'react-router-dom'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Heading, Text } from '@/components/ui'
import { Terminal, Zap, Cloud, Users } from 'lucide-react'
import { MainLayout } from '@/layouts/MainLayout'

export const LandingPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Heading level="h1" className="mb-6 text-5xl md:text-6xl terminal-glow">
              Write with Power
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto">
              A modern WYSIWYG editor with a terminal-inspired aesthetic.
              Create, edit, and manage your documents with style.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  <Terminal className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Link to="/documents">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-12">
            <Heading level="h2" className="mb-4">
              Features
            </Heading>
            <Text className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a powerful writing experience
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card variant="terminal" className="hover:shadow-glow-cyan transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Rich Text Editing</CardTitle>
                <CardDescription>
                  Full-featured editor with formatting, tables, code blocks, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Bold, italic, underline, strikethrough</li>
                  <li>• Multiple heading levels</li>
                  <li>• Lists, links, and images</li>
                  <li>• Code blocks with syntax highlighting</li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="terminal" className="hover:shadow-glow-cyan transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Cloud className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Auto-Save</CardTitle>
                <CardDescription>
                  Never lose your work with intelligent auto-save
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Automatic document persistence</li>
                  <li>• Real-time save status</li>
                  <li>• Version history (coming soon)</li>
                  <li>• Conflict resolution</li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="terminal" className="hover:shadow-glow-cyan transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Terminal Aesthetic</CardTitle>
                <CardDescription>
                  Beautiful retro design inspired by classic terminals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Green phosphor glow effects</li>
                  <li>• Monospace typography</li>
                  <li>• Dark, high-contrast theme</li>
                  <li>• Accessible and modern</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <Card variant="terminal" className="max-w-4xl mx-auto text-center">
            <CardContent className="p-12">
              <Heading level="h2" className="mb-4">
                Ready to Start Writing?
              </Heading>
              <Text className="mb-8 text-muted-foreground">
                Join now and experience the power of a modern editor with classic style
              </Text>
              <Link to="/login">
                <Button size="lg">
                  Get Started for Free
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </MainLayout>
  )
}
