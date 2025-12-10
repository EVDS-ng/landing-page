// Content extracted from websitecontent.md
// This content is hard-coded to work in client-side components

interface WebsiteContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaButton: string;
    supportingText: string;
  };
  problem: {
    headline: string;
    content: string;
  };
  solution: {
    headline: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  howItWorks: {
    forYourself: {
      title: string;
      steps: string[];
    };
    forOwnBirthday: {
      title: string;
      steps: string[];
    };
  };
  trust: {
    headline: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
  packages: {
    headline: string;
    plans: Array<{
      name: string;
      price: string;
      description: string;
      features: string[];
    }>;
  };
  testimonials: {
    headline: string;
    placeholder: string;
  };
  faq: {
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
  finalCta: {
    headline: string;
    subheadline: string;
    ctaButton: string;
    belowButton: string;
    trustBadges: string;
  };
  footer: {
    links: string;
    social: string;
    copyright: string;
  };
}

export function getWebsiteContent(): WebsiteContent {
  return {
    hero: {
      headline: "Stop wishing. Start celebrating.",
      subheadline:
        "Save for birthdays, invite contributions, and let trusted vendors handle everything. No stress, no excuses.",
      ctaButton: "Join the Waitlist → Get ₦2,000 bonus savings",
      supportingText:
        "Join 100+ Nigerians planning unforgettable birthdays in Lagos.",
    },
    problem: {
      headline: "You remember the birthday. The money doesn't show up.",
      content:
        'You want to give your loved ones something special. You promise yourself "this year will be different." But when the day arrives: Your salary is already stretched thin. You\'re scrambling for last-minute cash. You settle for something underwhelming. You feel guilty for months.',
    },
    solution: {
      headline: "Three steps to stress-free celebrations",
      steps: [
        {
          title: "Save with purpose",
          description:
            "Set your birthday goal and save automatically or manually. Track your progress. Watch your celebration fund grow - separate from your daily expenses.",
        },
        {
          title: "Invite contributions (optional)",
          description:
            "Share a simple link with friends and family. They contribute what they can - no awkward requests, no spreadsheets, no Venmo nightmares. You see the total grow together.",
        },
        {
          title: "We handle everything",
          description:
            "Choose your celebration package. Our vetted vendors deliver - the cake, decorations, photographer, everything. You just show up and celebrate.",
        },
      ],
    },
    howItWorks: {
      forYourself: {
        title: "For yourself:",
        steps: [
          '"My husband\'s 30th is in 4 months. I need ₦50,000."',
          "Save ₦12,500/month automatically",
          "Invite his friends to contribute",
          "Hit ₦50,000 goal",
          "Approve vendor team",
          "Celebrate stress-free",
        ],
      },
      forOwnBirthday: {
        title: "For your own birthday:",
        steps: [
          '"I want an amazing 25th birthday - ₦30,000 budget"',
          "Start saving ₦10,000/month",
          'Share link with friends: "Help me celebrate!"',
          "Combined funds reach goal",
          "Choose celebration package",
          "Vendors deliver your dream day",
        ],
      },
    },
    trust: {
      headline: "Your money. Your celebration. Fully protected.",
      features: [
        {
          title: "Safe & Secure",
          description:
            "Your savings are held in individual accounts through licensed financial partners. Ring-fenced group contributions can only pay vendors or refund - never withdrawn by organizers.",
        },
        {
          title: "Vetted Vendors Only",
          description:
            "Every vendor is verified: business registration checked, portfolio reviewed, references confirmed. They complete trial deliveries before handling larger events.",
        },
        {
          title: "Transparent Tracking",
          description:
            "See exactly how much you've saved and how much others have contributed. No hidden fees eating your funds.",
        },
        {
          title: "Money-Back Guarantee",
          description:
            "If vendors fail to deliver, you get a full refund or we arrange replacement. Your celebration matters to us.",
        },
      ],
    },
    packages: {
      headline: "Celebrations for every budget",
      plans: [
        {
          name: "Bronze Package",
          price: "From ₦10,000",
          description: "Perfect for intimate gatherings",
          features: ["Custom cake", "Drinks & juice", "Personalized card"],
        },
        {
          name: "Silver Package",
          price: "From ₦25,000",
          description: "Level up the celebration",
          features: [
            "Everything in Bronze",
            "Small chops catering",
            "Balloon decorations",
            "Surprise coordination",
          ],
        },
        {
          name: "Gold Package",
          price: "From ₦50,000",
          description: "Create lasting memories",
          features: [
            "Everything in Silver",
            "Professional photography",
            "Full meal catering",
            "Premium decorations",
          ],
        },
        {
          name: "Platinum Package",
          price: "From ₦100,000+",
          description: "The full experience",
          features: [
            "Everything in Gold",
            "Videography",
            "DJ/Entertainment",
            "Venue coordination",
            "Full event management",
          ],
        },
      ],
    },
    testimonials: {
      headline: "Real celebrations. Real stories.",
      placeholder: "[Placeholder for testimonials with photos from beta users]",
    },
    faq: {
      questions: [
        {
          question: "What if I need my money before the birthday?",
          answer:
            "Your personal savings can be withdrawn anytime. Early withdrawals may have small penalties to protect vendor commitments. Group contributions are ring-fenced - only refundable if the event is cancelled.",
        },
        {
          question: "How do I know the vendors are reliable?",
          answer:
            "Every vendor is vetted: we verify business registration, review portfolios, check references, and monitor trial deliveries. You see ratings from past users before approving your vendor team.",
        },
        {
          question: "What if the vendor messes up?",
          answer:
            "You confirm delivery with a token system. If there's an issue, our celebration coordinators arbitrate using photo evidence. You're protected with our money-back guarantee.",
        },
        {
          question: "Can I customize my package?",
          answer:
            "Absolutely. Choose a base package and add or remove items to fit your vision and budget.",
        },
        {
          question: "Do contributors need to create accounts?",
          answer:
            "No. They click your link, see the celebration details, contribute any amount, and they're done. No app download required.",
        },
        {
          question: "What cities do you serve?",
          answer:
            "We're launching in Lagos with 15+ vetted vendors. More Nigerian cities coming soon based on demand.",
        },
      ],
    },
    finalCta: {
      headline: "This birthday will be different.",
      subheadline:
        "Join Nigerians who are done making excuses and ready to celebrate.",
      ctaButton: "Join the Waitlist → Get ₦2,000 bonus",
      belowButton:
        "Early waitlist members get ₦2,000 free savings credit when we launch + priority vendor selection.",
      trustBadges:
        "Secure payments • Licensed partners • Vetted vendors • Money-back guarantee",
    },
    footer: {
      links: "About | How It Works | Vendors | Contact",
      social: "Instagram | Twitter | TikTok | Facebook",
      copyright: "© 2025 Everyday Surprises. Making birthdays unforgettable.",
    },
  };
}
