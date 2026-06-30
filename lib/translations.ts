/**
 * @file lib/translations.ts
 * @description Centralized translation dictionary for English (EN) and Vietnamese (VI) UI localization.
 */

export type Language = "vi" | "en";

export const translations = {
  vi: {
    // Top NavBar
    liveDemoSim: "Trình Mô Phỏng Dashboard Đột Phá",
    vàoDashboard: "Vào Dashboard",
    bắtĐầuNgay: "Bắt đầu ngay",
    viewDemo: "Xem Demo",
    logout: "Đăng xuất",
    activeProfile: "Hồ sơ hoạt động",
    newProfile: "+ THÊM MỚI",
    newPitchBtn: "Kịch bản mới",
    
    // Sidebar Tabs
    tabDashboard: "Bảng điều khiển",
    tabProfile: "Hồ sơ năng lực",
    tabProjects: "Dự án tiêu biểu",
    tabPitches: "Lịch sử Pitch",
    tabAnalytics: "Phân tích",
    tabSettings: "Cài đặt",
    tabHelp: "Trợ giúp",

    // Dashboard View (Main Panel)
    welcomeBack: "Chào mừng trở lại",
    profileSetupProgress: "Hoàn thiện hồ sơ để tăng 300% hiệu quả chuyển đổi",
    geminiOnline: "Gemini AI Connected (Online)",
    geminiOffline: "Local Simulation Mode (Offline Sandbox)",
    
    // Profile Builder Panel
    buildProfile: "XÂY DỰNG HỒ SƠ NĂNG LỰC MASTER",
    fullName: "Họ và Tên",
    jobTitle: "Chức danh Công việc",
    bio: "Tiểu sử chuyên môn",
    skills: "Kỹ năng chính",
    addSkillPlaceholder: "Thêm kỹ năng...",
    featuredProjects: "Dự án tiêu biểu",
    saveProfileBtn: "Lưu Hồ Sơ",
    profileSaved: "Hồ sơ đã được lưu thành công!",

    // Generate Panel
    generatePitchHeader: "TẠO BÀI PITCH ĐỘNG",
    targetAudienceLabel: "Mô tả khách hàng mục tiêu / Dán JD tuyển dụng",
    uploadJdBtn: "TẢI LÊN FILE JD (PDF)",
    targetAudiencePlaceholder: "Ví dụ: Công ty FinTech cần xây dựng dashboard chi tiêu và có tính năng AI...",
    smartSelectorLabel: "Tùy chọn kỹ năng đưa vào bài viết (Smart Selector)",
    toneSliderLabel: "Tông giọng bài viết (Tone of Voice)",
    toneFormal: "Trang trọng",
    toneBalanced: "Trung lập",
    toneCasual: "Thân thiện",
    generatePitchBtn: "Tạo bài Pitch Động",
    generatingPitchBtn: "Đang tạo bài viết...",
    pitchGeneratedSuccess: "Bản Pitch đã được tạo thành công!",

    // Live Preview Panel
    livePreviewHeader: "BẢN XEM TRƯỚC BÀI PITCH",
    noPreviewLoaded: "Chưa nạp bản xem trước bài Pitch",
    noPreviewDesc: "Nhập mô tả khách hàng mục tiêu ở ô bên trên và bấm nút tạo bài Pitch để xem phân tích của AI!",
    alignmentScoreLabel: "Điểm tương thích",
    strengthsLabel: "Thế mạnh của bạn",
    gapsLabel: "Điểm cần khắc phục",
    copied: "Đã sao chép vào bộ nhớ tạm!",

    // Pitch History Archive Tab
    historyHeader: "KHO LƯU TRỮ LỊCH SỬ PITCH",
    historyDesc: "Theo dõi các bản đề xuất Pitch đã tạo. Nạp lại bối cảnh, xem chi tiết hoặc xóa bản lưu.",
    searchPlaceholder: "Tìm kiếm bài pitch theo khách hàng, mục tiêu, hoặc tiêu đề...",
    loadContextBtn: "Nạp Bối Cảnh",
    sharePageBtn: "Chia sẻ",
    deletePitchTitle: "Xóa bài viết",
    archiveEmptyHeader: "Kho lưu trữ lịch sử trống",
    archiveEmptyDesc: "Tạo một bài pitch động tại Bảng điều khiển và lưu lại để xây dựng kho lịch sử của bạn.",
    noSearchResults: "Không tìm thấy bài pitch nào phù hợp với tìm kiếm của bạn.",
    copyBtn: "Sao chép",
    shareBtn: "Chia sẻ trang",
    noMatches: "Không khớp",

    // Projects Tab
    featuredProjectsHeader: "FEATURED PROJECTS (DỰ ÁN TIÊU BIỂU)",
    featuredProjectsDesc: "Các dự án nổi bật làm bằng chứng năng lực thực tế thuyết phục khách hàng.",
    addProjectBtn: "Add Project (Thêm dự án)",
    editProjectDetails: "Chỉnh sửa chi tiết dự án",
    addNewProjectDetails: "Thêm dự án tiêu biểu mới",
    projectTitleLabel: "Project Title (Tiêu đề dự án)",
    projectRoleLabel: "Your Role (Vai trò của bạn)",
    projectTagsLabel: "Tech Stack & Tools (Công nghệ sử dụng, phân tách bằng dấu phẩy)",
    projectOutcomeLabel: "Impact / Core Metric Result (Số liệu kết quả thực tế)",
    projectDescLabel: "Project Description / Outcome Details (Mô tả chi tiết dự án)",
    projectChallengeLabel: "The Challenge / Problem Solved (Thách thức bài toán cần giải - Tùy chọn)",
    projectSavedSuccess: "Dự án đã được lưu thành công!",
    projectRemovedSuccess: "Dự án đã được xóa khỏi hồ sơ!",
    noProjectsHeader: "Chưa có dự án nào trong hồ sơ.",
    noProjectsDesc: "Hãy thêm dự án đầu tiên ở phía trên để làm bằng chứng năng lực thuyết phục đối tác!",

    // Analytics Tab
    analyticsHeader: "PHÂN TÍCH HIỆU NĂNG PITCH",
    analyticsDesc: "Thống kê chỉ số tương thích và tần suất tạo pitch của hồ sơ năng lực.",
    averageScore: "Điểm tương thích trung bình",
    totalPitches: "Tổng số Pitch đã tạo",
    starredPitches: "Bài Pitch yêu thích",
    activeProfilesCount: "Số lượng Hồ sơ hoạt động",
    scoreDistribution: "Phân phối điểm tương thích",
    pitchFrequency: "Tần suất tạo Pitch theo thời gian",

    // Public Pitch View Page
    pitchTitleDefault: "Tailored Proposal Pitch",
    optimizedProposalFor: "Đề xuất tối ưu hóa cho",
    alternativeVision: "Tầm nhìn thay thế",
    aboutMe: "Giới thiệu về tôi",
    coreCapabilities: "Năng lực cốt lõi",
    portfolioProofPoints: "Bằng chứng năng lực & Dự án",
    connectWithMe: "Kết nối với tôi",
    scanLaserTooltip: "AI đang quét tệp tin PDF tuyển dụng...",
    
    // FAQ
    faqHeader: "Frequently Asked Questions",
    faqDesc: "Giải đáp những thắc mắc phổ biến về dịch vụ của chúng tôi.",
    faqQ1: "Synthesis AI hoạt động như thế nào?",
    faqA1: "Chúng tôi kết nối hồ sơ năng lực Master Profile của bạn với bối cảnh mục tiêu (JD tuyển dụng, mô tả dự án) để tạo ra các bài pitch được cá nhân hóa cao thông qua API Gemini.",
    faqQ2: "Tôi có thể tải đề xuất dưới dạng tệp gì?",
    faqA2: "Bạn có thể sao chép nhanh định dạng Markdown chuẩn hoặc kết xuất trực tiếp ra file PDF chuyên nghiệp để gửi ngay qua Email.",
    faqQ3: "Tôi có thể cấu hình bao nhiêu Profile?",
    faqA3: "Đối với gói Pro, bạn có thể tạo không giới hạn Master Profile để phục vụ cho các định hướng công việc khác nhau (Freelancer, Tư vấn, Quản lý).",
    faqQ4: "Dự án có bảo mật thông tin hồ sơ của tôi không?",
    faqA4: "Tuyệt đối bảo mật. Mọi thông tin hồ sơ và kịch bản tạo ra được lưu trữ trong cơ sở dữ liệu riêng tư liên kết với tài khoản Clerk của bạn."
  },
  en: {
    // Top NavBar
    liveDemoSim: "Interactive Live Demo Simulator",
    vàoDashboard: "Go to Dashboard",
    bắtĐầuNgay: "Get Started",
    viewDemo: "View Demo",
    logout: "Log out",
    activeProfile: "Active Profile",
    newProfile: "+ NEW",
    newPitchBtn: "New Pitch",
    
    // Sidebar Tabs
    tabDashboard: "Dashboard",
    tabProfile: "Master Profile",
    tabProjects: "Featured Projects",
    tabPitches: "Pitch History",
    tabAnalytics: "Analytics",
    tabSettings: "Settings",
    tabHelp: "Help",

    // Dashboard View (Main Panel)
    welcomeBack: "Welcome back",
    profileSetupProgress: "Complete your profile to boost response rates by 300%",
    geminiOnline: "Gemini AI Connected (Online)",
    geminiOffline: "Local Simulation Mode (Offline Sandbox)",
    
    // Profile Builder Panel
    buildProfile: "BUILD YOUR MASTER PROFILE",
    fullName: "Full Name",
    jobTitle: "Job Title",
    bio: "Professional Bio",
    skills: "Key Skills",
    addSkillPlaceholder: "Add skill...",
    featuredProjects: "Featured Projects",
    saveProfileBtn: "Save Profile",
    profileSaved: "Profile saved successfully!",

    // Generate Panel
    generatePitchHeader: "GENERATE DYNAMIC PITCH",
    targetAudienceLabel: "Target Audience Description / Paste JD",
    uploadJdBtn: "UPLOAD JD FILE (PDF)",
    targetAudiencePlaceholder: "e.g. FinTech startup looking for a frontend developer to build spend dashboards with AI...",
    smartSelectorLabel: "Include Profile Skills (Smart Selector)",
    toneSliderLabel: "Tone of Voice (Slider)",
    toneFormal: "Formal",
    toneBalanced: "Balanced",
    toneCasual: "Casual",
    generatePitchBtn: "Generate Dynamic Pitch",
    generatingPitchBtn: "Generating Pitch...",
    pitchGeneratedSuccess: "Pitch generated successfully!",

    // Live Preview Panel
    livePreviewHeader: "LIVE PITCH PREVIEW",
    noPreviewLoaded: "No Live Pitch Preview Loaded",
    noPreviewDesc: "Describe your target audience in the input fields and click generate to view your personalized scenarios!",
    alignmentScoreLabel: "Alignment Score",
    strengthsLabel: "Strengths & Match Points",
    gapsLabel: "Gaps & Improvements",
    copied: "Copied to clipboard!",

    // Pitch History Archive Tab
    historyHeader: "PITCH HISTORY ARCHIVE",
    historyDesc: "Keep track of your generated pitches. Re-load, view, or delete past context-aware creations.",
    searchPlaceholder: "Search pitches by client, goal, or title...",
    loadContextBtn: "Load Context",
    sharePageBtn: "Share Page",
    deletePitchTitle: "Delete Pitch",
    archiveEmptyHeader: "Your Pitch Archive is Empty",
    archiveEmptyDesc: "Generate a highly polished pitch in the Dashboard and save it to build a structured history.",
    noSearchResults: "No pitches matched your search query.",
    copyBtn: "Copy",
    shareBtn: "Share Page",
    noMatches: "No matches",

    // Projects Tab
    featuredProjectsHeader: "FEATURED PROJECTS",
    featuredProjectsDesc: "Featured projects provide proof points for target proposals.",
    addProjectBtn: "Add Project",
    editProjectDetails: "Edit Project Details",
    addNewProjectDetails: "Add New Featured Project",
    projectTitleLabel: "Project Title",
    projectRoleLabel: "Your Role",
    projectTagsLabel: "Tech Stack & Tools (comma-separated)",
    projectOutcomeLabel: "Impact / Core Metric Result",
    projectDescLabel: "Project Description / Outcome Details",
    projectChallengeLabel: "The Challenge / Problem Solved (Optional)",
    projectSavedSuccess: "Project saved successfully!",
    projectRemovedSuccess: "Project removed from profile!",
    noProjectsHeader: "No projects in profile.",
    noProjectsDesc: "Add your first project above to serve as a stellar proof point!",

    // Analytics Tab
    analyticsHeader: "PITCH ANALYTICS",
    analyticsDesc: "Track alignment scores and generation frequency over your profile lifespan.",
    averageScore: "Average Alignment Score",
    totalPitches: "Total Pitches Generated",
    starredPitches: "Starred Pitches",
    activeProfilesCount: "Active Profiles Count",
    scoreDistribution: "Alignment Score Distribution",
    pitchFrequency: "Pitch Generation Frequency",

    // Public Pitch View Page
    pitchTitleDefault: "Tailored Proposal Pitch",
    optimizedProposalFor: "Optimized Proposal for",
    alternativeVision: "Alternative Vision",
    aboutMe: "About Me",
    coreCapabilities: "Core Capabilities",
    portfolioProofPoints: "Portfolio Proof Points",
    connectWithMe: "Connect with me",
    scanLaserTooltip: "AI is scanning the uploaded Job Description PDF...",
    
    // FAQ
    faqHeader: "Frequently Asked Questions",
    faqDesc: "Common queries about our context-aware generation service.",
    faqQ1: "How does Synthesis AI work?",
    faqA1: "We connect your Master Profile with client contexts (JDs, RFPs) to write hyper-relevant proposals using Google's Gemini API.",
    faqQ2: "What file formats can I download?",
    faqA2: "You can copy standard Markdown syntax or print directly to professional PDFs to attach to your email proposals.",
    faqQ3: "How many profiles can I create?",
    faqA3: "Pro plan members can create unlimited profiles to align with different job profiles (e.g. Freelance, Architect, Manager).",
    faqQ4: "Is my profile data safe?",
    faqA4: "Absolutely. All profiles and saved proposals are stored in a private database linked to your secure Clerk account."
  }
};
