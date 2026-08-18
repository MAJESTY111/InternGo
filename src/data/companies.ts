import { Company } from "@/types";

export const companies: Company[] = [
  {
    id: "c1",
    name: "Zealtrix Digital",
    logoInitials: "ZD",
    logoColor: "#111111",
    industry: "Software Development",
    description:
      "Zealtrix Digital builds web and mobile products for startups and enterprises across West Africa, from fintech dashboards to e-commerce platforms.",
    website: "https://zealtrix.example.com",
    location: "Lagos",
    size: "11–50 employees",
    founded: "2019",
  },
  {
    id: "c2",
    name: "Paystack Labs",
    logoInitials: "PL",
    logoColor: "#0f766e",
    industry: "Fintech",
    description:
      "A payments infrastructure company helping businesses in Nigeria accept payments online and offline, with a strong focus on developer experience.",
    website: "https://paystacklabs.example.com",
    location: "Lagos",
    size: "201–500 employees",
    founded: "2015",
  },
  {
    id: "c3",
    name: "Terraform Studio",
    logoInitials: "TS",
    logoColor: "#7c3aed",
    industry: "Product Design Agency",
    description:
      "Terraform Studio partners with founders to design digital products people love — from research and UX to full visual identity systems.",
    website: "https://terraformstudio.example.com",
    location: "Abuja",
    size: "11–50 employees",
    founded: "2020",
  },
  {
    id: "c4",
    name: "Ibom Foods Group",
    logoInitials: "IF",
    logoColor: "#b45309",
    industry: "FMCG / Agriculture",
    description:
      "Ibom Foods Group processes and distributes packaged foods across Southern Nigeria, with a growing digital marketing and e-commerce arm.",
    website: "https://ibomfoods.example.com",
    location: "Port Harcourt",
    size: "501–1000 employees",
    founded: "2004",
  },
  {
    id: "c5",
    name: "Kenoty Analytics",
    logoInitials: "KA",
    logoColor: "#1d4ed8",
    industry: "Data & Analytics",
    description:
      "Kenoty Analytics helps banks and telcos in Nigeria turn raw data into decisions, building dashboards, models, and reporting pipelines.",
    website: "https://kenotyanalytics.example.com",
    location: "Lagos",
    size: "51–200 employees",
    founded: "2017",
  },
  {
    id: "c6",
    name: "Northbridge Capital",
    logoInitials: "NC",
    logoColor: "#065f46",
    industry: "Financial Services",
    description:
      "Northbridge Capital is an investment and asset management firm serving individuals and institutions across Nigeria.",
    website: "https://northbridgecapital.example.com",
    location: "Abuja",
    size: "51–200 employees",
    founded: "2011",
  },
  {
    id: "c7",
    name: "Savvy Logistics",
    logoInitials: "SL",
    logoColor: "#be123c",
    industry: "Logistics & Supply Chain",
    description:
      "Savvy Logistics builds last-mile delivery and fleet management technology for e-commerce businesses across Nigeria.",
    website: "https://savvylogistics.example.com",
    location: "Lagos",
    size: "201–500 employees",
    founded: "2018",
  },
  {
    id: "c8",
    name: "Ilorin Polytechnic Ventures",
    logoInitials: "IV",
    logoColor: "#4338ca",
    industry: "EdTech",
    description:
      "A university-affiliated venture building tools that help Nigerian students access learning resources, past questions, and career support.",
    website: "https://ilorinventures.example.com",
    location: "Ilorin",
    size: "11–50 employees",
    founded: "2021",
  },
  {
    id: "c9",
    name: "Greenline Energy",
    logoInitials: "GE",
    logoColor: "#15803d",
    industry: "Renewable Energy",
    description:
      "Greenline Energy designs and deploys solar power solutions for homes and businesses across Nigeria, reducing dependence on the national grid.",
    website: "https://greenlineenergy.example.com",
    location: "Abeokuta",
    size: "51–200 employees",
    founded: "2016",
  },
  {
    id: "c10",
    name: "Cadence HR Solutions",
    logoInitials: "CH",
    logoColor: "#9a3412",
    industry: "Human Resources",
    description:
      "Cadence HR Solutions provides recruitment, payroll, and HR consulting services to small and medium businesses across Nigeria.",
    website: "https://cadencehr.example.com",
    location: "Kaduna",
    size: "11–50 employees",
    founded: "2013",
  },
];

export function getCompanyById(id: string): Company | undefined {
  return companies.find((c) => c.id === id);
}
