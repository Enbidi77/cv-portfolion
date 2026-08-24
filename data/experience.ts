import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "enterprise-erp",
    company: "Enterprise ERP Company",
    role: {
      en: "Fullstack Developer",
      vi: "Lập trình viên Fullstack",
    },
    period: {
      en: "2025 – Present",
      vi: "2025 – Hiện tại",
    },
    isCurrent: true,
    responsibilities: {
      en: [
        "Maintain and enhance enterprise ERP systems serving critical business operations",
        "Develop and optimize SQL Server stored procedures and complex queries",
        "Improve database performance through query tuning and indexing strategies",
        "Troubleshoot production issues and resolve application incidents promptly",
        "Provide technical support and guidance for enterprise users across departments",
      ],
      vi: [
        "Bảo trì và phát triển các phân hệ ERP doanh nghiệp phục vụ vận hành cốt lõi",
        "Xây dựng và tối ưu các Stored Procedure và truy vấn phức tạp trên SQL Server",
        "Cải thiện hiệu năng cơ sở dữ liệu thông qua tối ưu chỉ mục (indexing) và phân tích truy vấn",
        "Điều tra, khắc phục các sự cố production và xử lý lỗi phát sinh nhanh chóng",
        "Hỗ trợ kỹ thuật và giải quyết các bài toán vận hành cho người dùng doanh nghiệp",
      ],
    },
  },
  {
    id: "tps-software",
    company: "TPS Software",
    role: {
      en: "Backend Web Developer",
      vi: "Lập trình viên Backend Web",
    },
    period: {
      en: "2023 – 2024",
      vi: "2023 – 2024",
    },
    isCurrent: false,
    responsibilities: {
      en: [
        "Developed RESTful APIs and backend services for client projects",
        "Worked in Agile environments with sprint planning, daily stand-ups, and retrospectives",
        "Built frontend applications using React and Angular frameworks",
        "Leveraged AWS services including SES, SQS, Lambda, and DynamoDB",
        "Deployed and managed applications on Azure VMs, App Service, Azure Functions, and GitHub Actions",
        "Adopted AI-assisted development tools to improve code quality and productivity",
      ],
      vi: [
        "Phát triển hệ thống RESTful API và dịch vụ backend cho các dự án khách hàng",
        "Làm việc theo mô hình Agile với các buổi Sprint Planning, Daily Stand-up và Retrospective",
        "Xây dựng giao diện ứng dụng web sử dụng React và Angular",
        "Tích hợp các dịch vụ AWS bao gồm SES, SQS, Lambda và DynamoDB",
        "Triển khai và quản lý ứng dụng trên Azure VMs, App Service, Azure Functions và GitHub Actions",
        "Ứng dụng các công cụ AI vào quy trình lập trình nhằm nâng cao năng suất và chất lượng code",
      ],
    },
  },
];
