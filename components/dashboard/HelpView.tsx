/**
 * @file components/dashboard/HelpView.tsx
 * @description Advanced multi-tab help center and interactive FAQ repository.
 *              Includes: Quick Start Workflow map, interactive Framer Motion accordion FAQs,
 *              and Pro AI Copywriting Best Practices.
 */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  HelpCircle,
  Sparkles,
  BookOpen,
  Zap,
  ChevronDown,
  ChevronUp,
  User,
  FileText,
  Sliders,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import { translations, type Language } from "@/lib/translations";

interface HelpViewProps {
  lang: Language;
}

export function HelpView({ lang }: HelpViewProps) {
  const t = translations[lang];
  const [activeSubTab, setActiveSubTab] = useState<"start" | "faq" | "tips">("start");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // FAQ localized list
  const faqs = [
    {
      q: lang === "vi" ? "Synthesis AI hoạt động như thế nào?" : "How does Synthesis AI work?",
      a: lang === "vi" 
        ? "Chúng tôi kết nối hồ sơ năng lực Master Profile của bạn với bối cảnh mục tiêu (JD tuyển dụng, mô tả dự án) để tạo ra các bài pitch được cá nhân hóa cao thông qua API Gemini tối ưu của Google."
        : "We connect your Master Profile with client contexts (JDs, RFPs) to write hyper-relevant proposals using Google's advanced Gemini API.",
    },
    {
      q: lang === "vi" ? "Làm thế nào để đưa dữ liệu dự án tùy chỉnh vào AI?" : "How can I feed custom project data to the AI?",
      a: lang === "vi"
        ? "Điều hướng đến tab 'Dự án tiêu biểu' trên menu trái để thêm chi tiết kinh nghiệm dự án của bạn. Khi tạo bài viết, AI sẽ tự động phân tích và trích xuất các kết quả thực tế từ các dự án này làm bằng chứng năng lực thuyết phục."
        : "Navigate to the 'Featured Projects' tab in the sidebar menu to add details of your work. The AI engine will automatically scan and extract metrics-driven results from these projects to serve as compelling proof points.",
    },
    {
      q: lang === "vi" ? "Tôi có thể sao chép hoặc xuất tệp định dạng nào?" : "What file formats can I download or copy?",
      a: lang === "vi"
        ? "Bạn có thể sao chép văn bản dạng Markdown chuẩn trực tiếp từ bảng xem trước bài viết, hoặc nhấn nút kết xuất PDF để in/tải tệp PDF 2 cột căn đều cực đẹp, chuẩn mực in ấn để đính kèm email gửi khách hàng."
        : "You can copy standard Markdown syntax directly from the live preview cards, or click the print button to generate a clean 2-column print-ready PDF layout aligned beautifully for email proposals.",
    },
    {
      q: lang === "vi" ? "Tôi có thể tạo tối đa bao nhiêu Profile?" : "How many profiles can I create?",
      a: lang === "vi"
        ? "Đối với thành viên gói Pro, bạn có thể tạo không giới hạn Master Profile để định vị bản thân ở nhiều vai trò khác nhau (ví dụ: Frontend Dev, Product Manager, Freelance consultant) nhằm khớp với mọi loại khách hàng."
        : "Pro plan members can create unlimited Master Profiles to align with different job profiles (e.g. Frontend Dev, Tech Lead, Freelancer) and customize targeting dynamically.",
    },
    {
      q: lang === "vi" ? "Dữ liệu hồ sơ của tôi có được bảo mật không?" : "Is my profile data safe?",
      a: lang === "vi"
        ? "Tuyệt đối an toàn. Mọi dữ liệu hồ sơ và lịch sử kịch bản được lưu trữ mã hóa trong cơ sở dữ liệu đám mây riêng tư liên kết với tài khoản Clerk của riêng bạn."
        : "Absolutely. All profiles and saved proposals are stored securely in a private PostgreSQL database linked to your verified Clerk account.",
    },
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in text-left">
      
      {/* Header section */}
      <div className="border-b border-outline-variant pb-5 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-geist text-primary flex items-center gap-2">
            <HelpCircle className="w-5.5 h-5.5 text-secondary" />
            {lang === "vi" ? "TRỢ GIÚP & HƯỚNG DẪN" : "HELP & DOCUMENTATION"}
          </h2>
          <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed font-semibold">
            {lang === "vi"
              ? "Tài liệu hướng dẫn sử dụng chi tiết và mẹo làm chủ kịch bản cá nhân hóa cùng Synthesis AI."
              : "Comprehensive manual, workflow guides, and expert copywriting tips for Synthesis AI."}
          </p>
        </div>

        {/* Sub-tabs menu */}
        <div className="flex bg-surface-container-low p-1 rounded-xl border border-outline-variant/60 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab("start")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "start"
                ? "bg-white text-primary shadow-sm"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            {lang === "vi" ? "Bắt đầu nhanh" : "Quick Start"}
          </button>
          <button
            onClick={() => setActiveSubTab("faq")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "faq"
                ? "bg-white text-primary shadow-sm"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            FAQs
          </button>
          <button
            onClick={() => setActiveSubTab("tips")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "tips"
                ? "bg-white text-primary shadow-sm"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {lang === "vi" ? "Mẹo viết bài" : "AI Writing Tips"}
          </button>
        </div>
      </div>

      {/* Main Sub-tab Content wrapper */}
      <div className="min-h-[350px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: QUICK START WORKFLOW MAP */}
          {activeSubTab === "start" && (
            <motion.div
              key="start-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-secondary/5 border border-secondary/15 rounded-xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                    {lang === "vi" ? "Quy trình đối khớp bối cảnh của AI" : "How Context-Aware Alignment Works"}
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {lang === "vi"
                      ? "Synthesis AI không tạo ra văn bản mẫu ngẫu nhiên. Chúng tôi đọc hồ sơ của bạn, đối soát trực tiếp với từ khóa trong JD tuyển dụng, và tối ưu bài viết theo đúng phong cách bạn cấu hình."
                      : "Synthesis AI reads your professional identity background, matches keyword patterns from your client's job requirements, and generates tailored messages matched to your target tone."}
                  </p>
                </div>
              </div>

              {/* Grid 4 steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                
                {/* Step 1 */}
                <div className="bg-surface border border-outline-variant/60 rounded-xl p-4 space-y-3 relative">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/10 border border-primary-container/20 flex items-center justify-center font-bold text-xs text-primary">
                    1
                  </div>
                  <h4 className="text-xs font-black text-primary uppercase flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-secondary" />
                    {lang === "vi" ? "Hồ sơ Master" : "Master Profile"}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {lang === "vi"
                      ? "Cập nhật bio, bộ kỹ năng cốt lõi và các dự án thực tế để AI làm tư liệu viết bài."
                      : "Fill in your background summary, skills list, and past project metrics to serve as proof points."}
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-surface border border-outline-variant/60 rounded-xl p-4 space-y-3 relative">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/10 border border-primary-container/20 flex items-center justify-center font-bold text-xs text-primary">
                    2
                  </div>
                  <h4 className="text-xs font-black text-primary uppercase flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-secondary" />
                    {lang === "vi" ? "Tải lên JD (PDF)" : "Scan JD Context"}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {lang === "vi"
                      ? "Tải lên tệp JD PDF tuyển dụng hoặc dán mô tả nhu cầu của đối tác để AI nghiên cứu."
                      : "Upload the target job post PDF or paste custom customer requirements for the AI to study."}
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-surface border border-outline-variant/60 rounded-xl p-4 space-y-3 relative">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/10 border border-primary-container/20 flex items-center justify-center font-bold text-xs text-primary">
                    3
                  </div>
                  <h4 className="text-xs font-black text-primary uppercase flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-secondary" />
                    {lang === "vi" ? "Cấu hình AI" : "Tune Parameters"}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {lang === "vi"
                      ? "Tinh chỉnh thanh kéo giọng điệu (Formal vs Casual) và chọn kỹ năng trọng tâm."
                      : "Select custom writing styles, length, and adjust the tone slider properties dynamically."}
                  </p>
                </div>

                {/* Step 4 */}
                <div className="bg-surface border border-outline-variant/60 rounded-xl p-4 space-y-3 relative">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/10 border border-primary-container/20 flex items-center justify-center font-bold text-xs text-primary">
                    4
                  </div>
                  <h4 className="text-xs font-black text-primary uppercase flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                    {lang === "vi" ? "Tạo & Chia sẻ" : "Generate & Share"}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {lang === "vi"
                      ? "Nhận ngay bài kịch bản pitch, chỉnh sửa nhanh, lưu trữ và chia sẻ link QR."
                      : "Get personalized scenarios instantly, tweak in real-time, print PDF, or share online links."}
                  </p>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: INTERACTIVE FAQ ACCORDION */}
          {activeSubTab === "faq" && (
            <motion.div
              key="faq-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-3"
            >
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-outline-variant rounded-xl overflow-hidden transition-all bg-surface shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-surface-container-low transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-bold text-primary tracking-wide">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-outline shrink-0 ml-3" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-outline shrink-0 ml-3" />
                      )}
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-4 border-t border-outline-variant/30 pt-3 text-[11px] text-[#47464f] leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* TAB 3: PRO AI WRITING TIPS */}
          {activeSubTab === "tips" && (
            <motion.div
              key="tips-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              <h3 className="text-xs font-black text-primary uppercase tracking-wider mb-2">
                {lang === "vi" ? "Mẹo tối ưu hóa bài đề xuất của bạn" : "Professional Copywriting Best Practices"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Tip 1 */}
                <div className="bg-white border border-outline-variant rounded-xl p-4 space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold text-secondary uppercase flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    {lang === "vi" ? "Đưa số liệu thực tế vào dự án" : "Use Action-Outcome Formulas"}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {lang === "vi"
                      ? "Khi thêm dự án trong tab 'Dự án tiêu biểu', thay vì chỉ mô tả 'Lập trình website React', hãy ghi rõ chỉ số kết quả như 'Tăng 40% hiệu suất tải trang' hoặc 'Tiết kiệm 20% chi phí hạ tầng'. AI sẽ trích xuất số liệu này để làm bài thuyết trình cực kỳ uy tín."
                      : "When documenting project proof points, don't just say 'Developed React site'. Write metrics: 'Reduced bundle size by 40%' or 'Handled 5,000 requests/sec'. The AI automatically flags these numeric proof metrics to convince recruiters."}
                  </p>
                </div>

                {/* Tip 2 */}
                <div className="bg-white border border-outline-variant rounded-xl p-4 space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold text-secondary uppercase flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    {lang === "vi" ? "Quét kỹ năng thông minh" : "Leverage Keyword Highlighting"}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {lang === "vi"
                      ? "Hãy tận dụng tính năng 'Gợi ý kỹ năng từ AI' ở Dashboard. AI sẽ tự động phân tích các kỹ năng chuyên môn cần thiết nhất từ JD tuyển dụng và cho phép bạn click nạp nhanh vào Profile chỉ trong 1 giây."
                      : "Make good use of the 'AI Skill Suggestions' feature on the dashboard. It scans the target description to identify missing skill requirements and lets you insert them into your profile in 1-click."}
                  </p>
                </div>

                {/* Tip 3 */}
                <div className="bg-white border border-outline-variant rounded-xl p-4 space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold text-secondary uppercase flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    {lang === "vi" ? "Tùy biến phong cách viết" : "Customize Writing Styles"}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {lang === "vi"
                      ? "Tận dụng linh hoạt các phong cách viết: chọn 'Phân tích (Analytical)' cho các khách hàng yêu cầu kỹ thuật chuyên sâu, và chọn 'Mạnh mẽ (Bold)' hoặc 'Thuyết phục (Persuasive)' cho các cuộc trao đổi với Ban giám đốc để tăng chuyển đổi."
                      : "Select 'Analytical' style for highly technical readers, and 'Bold' or 'Persuasive' for sales calls and executive-level pitching to maximize conversion."}
                  </p>
                </div>

                {/* Tip 4 */}
                <div className="bg-white border border-outline-variant rounded-xl p-4 space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold text-secondary uppercase flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    {lang === "vi" ? "Sử dụng kịch bản song song" : "Compare Scenario A & B"}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {lang === "vi"
                      ? "Luôn kiểm tra cả 2 Kịch bản AI tạo ra: Kịch bản A tập trung vào giải quyết vấn đề số liệu kỹ thuật, Kịch bản B lại mang tầm nhìn đột phá trải nghiệm khách hàng. Lựa chọn kịch bản tối ưu nhất hoặc kết xuất cả 2 ra file PDF in ấn."
                      : "Check both scenarios: Scenario A presents direct technical problem-solving, whereas Scenario B outlines a premium customer experience vision. Choose the best fit or print both scenarios together."}
                  </p>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
