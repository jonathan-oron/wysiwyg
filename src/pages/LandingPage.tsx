import { Link } from 'react-router-dom'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Heading, Text } from '@/components/ui'
import { Sparkles, Zap, Cloud, Heart } from 'lucide-react'
import { MainLayout } from '@/layouts/MainLayout'

export const LandingPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto shimmer-effect">
            <Heading level="h1" variant="colorful" glow className="mb-6 text-5xl md:text-6xl animate-float">
              Write with Magic ✨
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto">
              A vibrant WYSIWYG editor bursting with color and creativity!
              Create, edit, and manage your documents with dazzling style and playful energy.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" variant="vibrant" className="w-full sm:w-auto animate-accent-pulse">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Link to="/documents">
                <Button size="lg" variant="brand" className="w-full sm:w-auto">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-12">
            <Heading level="h2" variant="brand" className="mb-4">
              Magical Features
            </Heading>
            <Text className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for an enchanting writing experience
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card variant="soft" className="hover:shadow-accent-multi transition-all hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-accent-warm flex items-center justify-center mb-4 shadow-accent-strong">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Rich Text Editing</CardTitle>
                <CardDescription>
                  Full-featured editor with gorgeous formatting and vibrant colors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>✨ Bold, italic, underline, strikethrough</li>
                  <li>🌈 Colorful gradient headings</li>
                  <li>💎 Lists, links, and beautiful images</li>
                  <li>🎨 Colorful code blocks with highlighting</li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="soft" className="hover:shadow-accent-multi transition-all hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-accent-cool flex items-center justify-center mb-4 shadow-accent-medium">
                  <Cloud className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Auto-Save</CardTitle>
                <CardDescription>
                  Never lose your magic with intelligent auto-save
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>💫 Automatic document persistence</li>
                  <li>⚡ Real-time save status</li>
                  <li>🔮 Version history (coming soon)</li>
                  <li>✅ Conflict resolution</li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="soft" className="hover:shadow-accent-multi transition-all hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center mb-4 shadow-accent-combined animate-accent-pulse">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Vibrant Design</CardTitle>
                <CardDescription>
                  Dazzling design bursting with colorful gradients and effects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>🌟 Accent glow effects everywhere</li>
                  <li>🦄 Playful rounded typography</li>
                  <li>🎀 Soft & vibrant color palette</li>
                  <li>✨ Shimmers, effects & gradients</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <Card variant="brand" className="max-w-4xl mx-auto text-center shimmer-effect">
            <CardContent className="p-12">
              <Heading level="h2" variant="colorful" glow className="mb-4">
                Ready to Create Magic? ✨
              </Heading>
              <Text className="mb-8 text-neutral-700 font-medium">
                Join now and experience the most colorful, vibrant editor you've ever seen!
              </Text>
              <Link to="/login">
                <Button size="lg" variant="vibrant" className="animate-bounce-slow">
                  <Sparkles className="mr-2 h-5 w-5" />
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
