export interface LearningNavItem {
	label: string;
	href: string;
	active?: boolean;
}

export interface LearningCourse {
	id: string;
	title: string;
	subtitle: string;
	basePath: string;
	chapters: Array<{
		label: string;
		items: LearningNavItem[];
	}>;
}

export interface LearningWorkflow {
	id: string;
	summary: string;
	deepLecture: string;
	source: string;
	reasoning: string;
	quiz: {
		src: string;
		title: string;
	};
	caseStudy: {
		title: string;
		stem: string;
		tasks: string[];
		keyPoints: string[];
	};
	objectives?: string[];
}

export const learningCourses: Record<string, LearningCourse> = {
	'on-benh-dai-cuong': {
		id: 'on-benh-dai-cuong',
		title: 'Ôn bệnh đại cương',
		subtitle: 'Học để hành',
		basePath: '/learn/books/on-benh-dai-cuong',
		chapters: [
			{
				label: 'Tóm tắt theo chương',
				items: [
					{
						label: '01. Đại cương',
						href: '/learn/books/on-benh-dai-cuong/tom-tat/01-bai-1-dai-cuong-ve-on-benh/',
					},
					{
						label: '02. Nguyên nhân',
						href: '/learn/books/on-benh-dai-cuong/tom-tat/03-bai-2-nguyen-nhan-benh-va-phat-benh/',
					},
					{
						label: '04. Biện chứng',
						href: '/learn/books/on-benh-dai-cuong/tom-tat/06-bai-3-bien-chung-ve-on-benh/',
						active: true,
					},
					{
						label: '05. Điều trị',
						href: '/learn/books/on-benh-dai-cuong/tom-tat/13-6-dieu-tri-trieu-chung/',
					},
					{
						label: '06. Phòng ngừa',
						href: '/learn/books/on-benh-dai-cuong/tom-tat/11-bai-5-du-phong-on-benh/',
					},
				],
			},
		],
	},
};

export const learningTabs = [
	{ id: 'overview', label: 'Tổng quan' },
	{ id: 'eightyTwenty', label: '80/20', active: true },
	{ id: 'deep', label: 'Bài giảng sâu' },
	{ id: 'source', label: 'Nội dung gốc' },
	{ id: 'reasoning', label: 'Lý giải sâu' },
	{ id: 'quiz', label: 'Lượng giá' },
	{ id: 'case', label: 'Ca lâm sàng' },
];

export const sampleObjectives = [
	'Hiểu bản chất Ôn bệnh',
	'Phân loại theo tầng bệnh',
	'Nắm rõ truyền biến',
	'Liên hệ vệ-khí-dinh-huyết',
	'Ứng dụng vào pháp trị',
];

export const lessonOneWorkflow: LearningWorkflow = {
	id: 'on-benh-dai-cuong-bai-1',
	summary: 'books/on-benh-dai-cuong/tom-tat/01-bai-1-dai-cuong-ve-on-benh',
	deepLecture: 'books/on-benh-dai-cuong/bai-giang/01-dai-cuong-on-benh',
	source: 'books/on-benh-dai-cuong/nguyen-thuy/01-bai-1-dai-cuong-ve-on-benh',
	reasoning: 'topics/explanation/on-benh-dai-cuong-bai-1-dai-cuong-ve-on-benh',
	quiz: {
		src: 'quiz/on-benh-dai-cuong/dai-cuong.html',
		title: 'Lượng giá Đại cương Ôn bệnh',
	},
	caseStudy: {
		title: 'Ca nhận diện Ôn bệnh và phân biệt Thương hàn',
		stem:
			'Hai người bệnh cùng sốt ngày đầu. Người A sợ lạnh rõ, đau mình nhiều, không khát, rêu trắng mỏng, mạch phù khẩn. Người B sốt, hơi sợ gió, họng đỏ, ho, khát nhẹ, đầu lưỡi đỏ, mạch phù sác. Cả hai chưa có ban chẩn, mê sảng hoặc xuất huyết.',
		tasks: [
			'Phân loại người nào nghiêng về Thương hàn biểu hàn, người nào nghiêng về Ôn bệnh phế vệ.',
			'Chỉ ra dấu hiệu quyết định thuộc tính hàn hay ôn nhiệt.',
			'Nhận định ca Ôn bệnh còn ở tầng nông hay đã vào sâu.',
			'Nêu vì sao không nên dùng cùng một phép phát hãn cho cả hai.',
		],
		keyPoints: [
			'Người A có sợ lạnh rõ, đau mình, không khát, mạch phù khẩn nên nghiêng về ngoại cảm hàn tà.',
			'Người B có họng đỏ, ho, khát, đầu lưỡi đỏ, mạch phù sác nên nghiêng về ôn tà phạm phế vệ.',
			'Ca Ôn bệnh chưa có ban, xuất huyết hoặc rối loạn thần chí nên chưa có bằng chứng vào dinh huyết.',
			'Ôn tà dễ thương tân dịch, phát hãn mạnh kiểu biểu hàn có thể làm khô táo và hao tân thêm.',
		],
	},
	objectives: [
		'Định nghĩa đúng Ôn bệnh',
		'Phân biệt ôn tà với hàn tà',
		'Nắm các trục phân loại chính',
		'Biết dùng vệ-khí-dinh-huyết',
		'Áp dụng vào case sốt cấp',
	],
};

export const lessonTwoWorkflow: LearningWorkflow = {
	id: 'on-benh-dai-cuong-bai-2',
	summary: 'books/on-benh-dai-cuong/tom-tat/03-bai-2-nguyen-nhan-benh-va-phat-benh',
	deepLecture: 'books/on-benh-dai-cuong/bai-giang/02-nguyen-nhan-phat-benh-on-benh',
	source: 'books/on-benh-dai-cuong/nguyen-thuy/03-bai-2-nguyen-nhan-benh-va-phat-benh',
	reasoning: 'topics/explanation/on-benh-dai-cuong-bai-2-nguyen-nhan-benh-va-phat-benh',
	quiz: {
		src: 'quiz/on-benh-dai-cuong/dai-cuong.html',
		title: 'Lượng giá Nguyên nhân và phát bệnh Ôn bệnh',
	},
	caseStudy: {
		title: 'Ca phân loại ôn tà và kiểu phát bệnh',
		stem:
			'Ba người bệnh cùng đến khám. Người A ho khan, mũi họng khô, ít đàm, đại tiện táo sau nhiều ngày thời tiết khô nóng. Người B sốt cao ngay từ đầu, phiền khát, tiểu đỏ, lưỡi đỏ, gần như không có biểu chứng. Người C sốt cấp, hầu họng sưng đau, ban chẩn, trong lớp có nhiều người mắc tương tự.',
		tasks: [
			'Xác định người A nghiêng về táo nhiệt, ôn nhiệt hay ôn độc/lệ khí.',
			'Phân biệt người B là tân cảm hay phục tà ôn bệnh.',
			'Chỉ ra vì sao người C phải nghĩ đến ôn độc/lệ khí và yếu tố phòng dịch.',
			'Nêu hướng xử trí nguyên tắc cho từng người theo cơ chế nguyên nhân.',
		],
		keyPoints: [
			'Người A có khô rõ ở phế và đại trường nên nghi táo nhiệt phạm phế, thương tân dịch.',
			'Người B mới khởi đã lý nhiệt rõ, ít biểu chứng nên nghi phục tà phát từ lý hơn tân cảm.',
			'Người C có độc nhiệt tại hầu họng/ban chẩn và nhiều ca cùng mắc nên phải nghĩ ôn độc hoặc lệ khí.',
			'Tân cảm thiên thấu tà giải biểu; phục tà thiên thanh lý nhiệt, dưỡng âm, thấu tà; ôn độc/lệ khí cần thanh nhiệt giải độc và kiểm soát lây.',
		],
	},
	objectives: [
		'Nhận diện các nhóm ôn tà chính',
		'Phân biệt táo nhiệt, ôn nhiệt và ôn độc',
		'Hiểu điều kiện phát bệnh tà-chính',
		'Phân biệt tân cảm với phục tà',
		'Áp dụng vào quyết định thấu, thanh, dưỡng',
	],
};

export const lessonThreeWorkflow: LearningWorkflow = {
	id: 'on-benh-dai-cuong-bai-3',
	summary: 'books/on-benh-dai-cuong/tom-tat/06-bai-3-bien-chung-ve-on-benh',
	deepLecture: 'books/on-benh-dai-cuong/bai-giang/03-bien-chung',
	source: 'books/on-benh-dai-cuong/nguyen-thuy/06-bai-3-bien-chung-ve-on-benh',
	reasoning: 'topics/explanation/on-benh-dai-cuong-bai-3-bien-chung-ve-on-benh',
	quiz: {
		src: 'quiz/on-benh-dai-cuong/mcq-bien-chung-on-benh-chuyensau.html',
		title: 'Lượng giá Biện chứng Ôn bệnh - Chuyên sâu',
	},
	caseStudy: {
		title: 'Ca nhận diện tầng bệnh',
		stem:
			'Người bệnh sốt cao về đêm, miệng khô nhưng không khát nhiều, tâm phiền khó ngủ, thỉnh thoảng nói sảng. Lưỡi đỏ thẫm, mạch tế sác. Trước đó 2 ngày có sốt cao, khát nước, rêu vàng.',
		tasks: [
			'Xác định bệnh đang ở vệ, khí, dinh hay huyết.',
			'Chỉ ra dấu hiệu quyết định tầng bệnh.',
			'Giải thích vì sao đây không còn là khí phần đơn thuần.',
			'Nêu hướng pháp trị theo nguyên tắc tầng bệnh.',
		],
		keyPoints: [
			'Sốt cao về đêm, tâm phiền/nói sảng và lưỡi đỏ thẫm hướng mạnh đến dinh phần.',
			'Giai đoạn trước có dấu khí phần, hiện đã có xu hướng tà nhiệt nhập dinh.',
			'Chưa có xuất huyết nhiều nơi hoặc lưỡi tối thẫm nên chưa xếp huyết phần điển hình.',
		],
	},
};

export const learningWorkflows = [lessonOneWorkflow, lessonTwoWorkflow, lessonThreeWorkflow];

export const getLearningWorkflowBySummary = (summary: string) =>
	learningWorkflows.find((workflow) => workflow.summary === summary);
