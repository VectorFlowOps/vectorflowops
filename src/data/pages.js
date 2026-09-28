/** Copy for the account pages and the not-found page. */

export const signIn = {
  title: "Welcome back",
  subtitle: "Sign in to your VFO workspace.",
  google: "Continue with Google",
  divider: "or with email",
  email: { label: "Work email", placeholder: "you@company.com" },
  password: { label: "Password", placeholder: "••••••••", forgot: "Forgot password?" },
  submit: "Sign in",
  demoNotice: "This is a demo site, so sign-in isn't connected yet. Start a free trial instead.",
  switch: { prompt: "New to VFO?", label: "Start a free trial", href: "/get-started" },
};

export const getStarted = {
  eyebrow: "Free for 30 days",
  title: "Start your free trial.",
  body: "All three portals, unlimited users and every integration, with no card required. Import your portfolio from a spreadsheet, AppFolio or Buildium in an afternoon.",
  points: [
    "No card required, cancel any time",
    "Management, landlord and tenant portals included",
    "Import from a spreadsheet, AppFolio or Buildium",
    "Onboarding call with a real person",
  ],
  form: {
    title: "Create your workspace",
    role: {
      label: "I am a",
      options: [
        { value: "pmc", label: "Property management company" },
        { value: "landlord", label: "Landlord" },
        { value: "tenant", label: "Tenant" },
      ],
    },
    name: { label: "Full name", placeholder: "Dana Kim" },
    email: { label: "Work email", placeholder: "you@company.com" },
    company: { label: "Company", placeholder: "Seaview Property Group" },
    units: {
      label: "Units under management",
      options: ["1–10", "11–50", "51–200", "201–1,000", "1,000+"],
    },
    submit: "Create my workspace",
    legal: "By continuing you agree to the Terms and Privacy Policy.",
  },
  success: {
    title: "You're in.",
    body: "Check your inbox for a link to finish setting up your workspace. This is a demo site, so no email is actually sent.",
    cta: { label: "Back to home", href: "/" },
  },
};

export const notFound = {
  code: "404",
  title: "That page moved out.",
  body: "The link may be old, or the page may never have existed. The home page has everything.",
  cta: { label: "Go home", href: "/" },
};

export const cookieConsent = {
  title: "We use cookies",
  body: "Essential cookies keep VFO working. With your permission we also use analytics cookies to see which pages help and which don't. No advertising cookies, ever.",
  acceptAll: "Accept all",
  essentialOnly: "Essential only",
  policy: { label: "Privacy policy", href: "#" },
};

export const waitlist = {
  eyebrow: "Early access",
  title: "Join the waitlist.",
  body: "VFO is opening to property management companies and landlords in small groups, so every team gets a proper onboarding. Leave your details and we'll email you the moment your spot opens.",
  points: [
    "Founding-member pricing, locked in for two years",
    "Priority onboarding and free migration",
    "A say in what we build next",
  ],
  proof: "Property teams from Miami to Seattle are already on the list.",
  form: {
    title: "Save your spot",
    role: {
      label: "I am a",
      options: [
        { value: "pmc", label: "Property management company" },
        { value: "landlord", label: "Landlord" },
        { value: "tenant", label: "Tenant" },
      ],
    },
    name: { label: "Full name", placeholder: "Dana Kim" },
    email: { label: "Work email", placeholder: "you@company.com" },
    company: { label: "Company", placeholder: "Seaview Property Group" },
    units: {
      label: "Units under management",
      options: ["1–10", "11–50", "51–200", "201–500", "500+"],
    },
    wish: {
      label: "What should VFO do first for you?",
      placeholder: "Optional. Rent collection, owner statements, Zillow leads…",
    },
    submit: "Join the waitlist",
    submitting: "Saving your spot…",
    legal: "No spam, no sharing your details. Unsubscribe with one click.",
  },
  success: {
    title: "You're on the list.",
    body: "Thanks for joining. We'll email you when your spot opens, with a calendar link to book your onboarding.",
    cta: { label: "Back to home", href: "/" },
  },
};
