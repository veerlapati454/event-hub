import reactWorkshop from "../assets/react-workshop.webp";
import aiProduct from "../assets/ai-product.webp";
import funding from "../assets/funding.webp";
import uiSprint from "../assets/ui-sprint.webp";
import edtech from "../assets/edtech.webp";
import cloud from "../assets/cloud.webp";
import analytics from "../assets/analytics.webp";
import typography from "../assets/typography.webp";
import study from "../assets/study.webp";
import witMeetup from "../assets/wit-meetup.webp";
import leadership from "../assets/leadership.webp";
import figma from "../assets/figma.webp";

export const CATEGORIES = ["Technology", "Business", "Design", "Education"];

export const events = [
  { id: 1, title: "React Foundations Workshop", date: "2026-12-05", location: "Hyderabad", category: "Technology", seats: 40, featured: true, image: reactWorkshop, description: "A hands-on day covering components, hooks, routing and state. Bring a laptop and leave with a working app." },
  { id: 2, title: "AI for Product Builders", date: "2026-12-12", location: "Bengaluru", category: "Technology", seats: 120, featured: true, image: aiProduct, description: "Learn how teams ship AI features: prompt design, evaluation and rollout, with live demos and case studies." },
  { id: 3, title: "Startup Funding Masterclass", date: "2026-12-08", location: "Mumbai", category: "Business", seats: 60, featured: true, image: funding, description: "Founders and investors break down pitch decks, term sheets and what makes an early round close." },
  { id: 4, title: "UI Design Sprint", date: "2026-12-15", location: "Hyderabad", category: "Design", seats: 30, featured: false, image: uiSprint, description: "Go from problem statement to clickable prototype in one day, working in small teams with mentor feedback." },
  { id: 5, title: "Teaching with Technology", date: "2026-12-20", location: "Chennai", category: "Education", seats: 80, featured: false, image: edtech, description: "Practical classroom tools, assessment ideas and blended-learning strategies for educators at every level." },
  { id: 6, title: "Cloud Fundamentals Bootcamp", date: "2027-01-09", location: "Pune", category: "Technology", seats: 50, featured: false, image: cloud, description: "Deploy, scale and monitor an application on the cloud while learning core infrastructure concepts." },
  { id: 7, title: "Marketing Analytics Summit", date: "2027-01-16", location: "Delhi", category: "Business", seats: 200, featured: true, image: analytics, description: "Talks and workshops on attribution, dashboards and turning campaign data into decisions." },
  { id: 8, title: "Typography & Brand Identity", date: "2027-01-23", location: "Bengaluru", category: "Design", seats: 25, featured: false, image: typography, description: "Pair typefaces, build a type scale and apply it across a small brand system in this studio session." },
  { id: 9, title: "Study Skills for Exams", date: "2027-01-30", location: "Hyderabad", category: "Education", seats: 100, featured: false, image: study, description: "Evidence-based techniques for memory, planning and focus, designed for students and parents." },
  { id: 10, title: "Women in Tech Meetup", date: "2027-02-06", location: "Chennai", category: "Technology", seats: 150, featured: false, image: witMeetup, description: "An evening of lightning talks, mentoring circles and networking with engineers and leaders." },
  { id: 11, title: "Leadership for New Managers", date: "2027-02-13", location: "Mumbai", category: "Business", seats: 45, featured: false, image: leadership, description: "Run one-on-ones, give feedback and manage priorities with confidence in your first management role." },
  { id: 12, title: "Figma Prototyping Lab", date: "2027-02-20", location: "Delhi", category: "Design", seats: 35, featured: false, image: figma, description: "Build interactive prototypes with variables, components and smart animate, then test them with real users." },
];