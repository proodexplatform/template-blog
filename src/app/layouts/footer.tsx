// components/Footer.tsx
export function Footer() {
  return (
    <footer className="mt-16 border-t py-6 text-center text-sm text-muted-foreground">
      <span>© {new Date().getFullYear()} MyBlog. All rights reserved.</span>
    </footer>
  );
};