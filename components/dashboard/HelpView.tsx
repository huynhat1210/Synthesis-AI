/**
 * @file components/dashboard/HelpView.tsx
 * @description Renders static manual guide and FAQ guide page.
 */
"use client";

import React from "react";
import { translations, type Language } from "@/lib/translations";

interface HelpViewProps {
  lang: Language;
}

export function HelpView({ lang }: HelpViewProps) {
  const t = translations[lang];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm space-y-6 animate-fade-in">
      <div className="border-b border-outline-variant pb-4">
        <h2 className="text-xl font-bold font-geist text-primary">
          {lang === "vi" ? "TRỢ GIÚP & HƯỚNG DẪN SỬ DỤNG" : "HELP & MANUAL GUIDE"}
        </h2>
        <p className="text-sm text-on-surface-variant">
          {lang === "vi"
            ? "Câu hỏi thường gặp và hướng dẫn sử dụng tối đa hiệu quả Synthesis AI."
            : "Frequently Asked Questions & guidelines to make the most out of Synthesis AI."}
        </p>
      </div>

      <div className="space-y-4 max-w-3xl animate-fade-in">
        <div className="p-4 bg-surface rounded-xl border border-outline-variant">
          <h3 className="text-sm font-bold text-primary mb-1">{t.faqQ1}</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">{t.faqA1}</p>
        </div>

        <div className="p-4 bg-surface rounded-xl border border-outline-variant">
          <h3 className="text-sm font-bold text-primary mb-1">
            {lang === "vi"
              ? "Làm thế nào để đưa dữ liệu dự án tùy chỉnh vào AI?"
              : "How can I feed custom project data to the AI?"}
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            {lang === "vi"
              ? <>Điều hướng đến tab <strong>Dự án tiêu biểu</strong> trong thanh điều hướng bên để thêm và chỉnh sửa kinh nghiệm dự án của bạn. Sau khi thêm, AI sẽ tích hợp chúng như bằng chứng năng lực.</>
              : <>Navigate to the <strong>Projects</strong> tab in the sidebar navigation rail to add and edit your project experience. Once added, the AI engine intelligently integrates them as proof dimensions.</>}
          </p>
        </div>

        <div className="p-4 bg-surface rounded-xl border border-outline-variant">
          <h3 className="text-sm font-bold text-primary mb-1">
            {lang === "vi"
              ? "Tôi có thể sao chép các kịch bản đã tạo dễ dàng không?"
              : "Can I copy the generated scenarios easily?"}
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            {lang === "vi"
              ? <>Có! Trong phần <strong>Bản Xem Trước Bài Pitch</strong> ở cuối trang Dashboard, bạn sẽ thấy nút sao chép bên cạnh mỗi thẻ kịch bản để lưu văn bản ngay vào clipboard.</>
              : <>Yes! Inside the <strong>Live Pitch Preview</strong> at the bottom of the dashboard, you will find copy-icon triggers next to each card to instantly save text to your clipboard.</>}
          </p>
        </div>

        <div className="p-4 bg-surface rounded-xl border border-outline-variant">
          <h3 className="text-sm font-bold text-primary mb-1">{t.faqQ2}</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">{t.faqA2}</p>
        </div>

        <div className="p-4 bg-surface rounded-xl border border-outline-variant">
          <h3 className="text-sm font-bold text-primary mb-1">{t.faqQ3}</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">{t.faqA3}</p>
        </div>

        <div className="p-4 bg-surface rounded-xl border border-outline-variant">
          <h3 className="text-sm font-bold text-primary mb-1">{t.faqQ4}</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">{t.faqA4}</p>
        </div>
      </div>
    </div>
  );
}
