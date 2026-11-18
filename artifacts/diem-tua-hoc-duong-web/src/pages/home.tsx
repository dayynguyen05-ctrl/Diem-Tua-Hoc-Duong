import { useGetStatsOverview, useGetFeaturedResources } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowRight,
  BookHeart,
  BookOpen,
  Check,
  Clock,
  Compass,
  Heart,
  HeartPulse,
  MessageCircleHeart,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { IssueIntakeDialog } from "@/components/issue-intake-dialog";
import { StudyStreakCard } from "@/components/study-streak-card";

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useGetStatsOverview();
  const { data: featuredResources, isLoading: resourcesLoading } = useGetFeaturedResources();

  return (
    <div className="home-page w-full">
      <IssueIntakeDialog />

      <section className="home-hero">
        <div className="home-container home-hero-grid">
          <div className="home-hero-copy">
            <div className="home-eyebrow">
              <span className="home-eyebrow-mark"><ShieldCheck aria-hidden="true" /></span>
              Không gian an toàn dành cho bạn
            </div>
            <h1>
              Có những ngày<br />
              <em>chỉ cần một nơi</em><br />
              để được lắng nghe.
            </h1>
            <p className="home-hero-lede">
              Chuyện học hành, bạn bè hay những điều khó gọi tên — bạn có thể bắt đầu từ bất cứ điều gì, theo cách của mình.
            </p>
            <div className="home-hero-actions">
              <Link href="/chat" className="home-primary-link" data-testid="link-home-chat">
                <MessageCircleHeart aria-hidden="true" />
                Bắt đầu trò chuyện
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/hotlines" className="home-quiet-link" data-testid="link-home-hotlines-hero">
                Tôi cần hỗ trợ ngay
              </Link>
            </div>
            <div className="home-trust-line">
              <span><Check aria-hidden="true" /> Không phán xét</span>
              <span><Check aria-hidden="true" /> Bạn chủ động chia sẻ</span>
            </div>
          </div>

          <div className="home-note-wrap" aria-label="Lời nhắn từ Điểm Tựa">
            <div className="home-orbit home-orbit-one" />
            <div className="home-orbit home-orbit-two" />
            <div className="home-note-card">
              <div className="home-note-topline">
                <span className="home-note-brand"><Heart aria-hidden="true" /> ĐIỂM TỰA</span>
                <span className="home-note-dot" />
              </div>
              <div className="home-note-quote-mark">“</div>
              <p>Bạn không cần phải biết bắt đầu từ đâu. Cứ kể điều đang khiến bạn bận lòng.</p>
              <div className="home-note-footer">
                <span className="home-note-avatar"><HeartPulse aria-hidden="true" /></span>
                <span><strong>Ở đây cùng bạn</strong><small>Một bước nhỏ cũng là bắt đầu.</small></span>
              </div>
            </div>
            <div className="home-note-caption"><span /> Luôn sẵn sàng khi bạn cần</div>
          </div>
        </div>
        <div className="home-scroll-cue" aria-hidden="true"><span>Khám phá các điểm tựa</span><ArrowDownRight /></div>
      </section>

      <div className="home-streak-wrap">
        <StudyStreakCard />
      </div>

      <section className="home-pathways" aria-labelledby="home-pathways-title">
        <div className="home-container">
          <div className="home-section-heading">
            <div>
              <span className="home-kicker">BẮT ĐẦU THEO CÁCH CỦA BẠN</span>
              <h2 id="home-pathways-title">Bạn đang cần điều gì?</h2>
            </div>
            <p>Không có lựa chọn nào là sai. Hãy chọn điều phù hợp nhất với bạn lúc này.</p>
          </div>
          <div className="home-pathway-grid">
            <Link href="/chat" className="home-pathway home-pathway-chat" data-testid="link-home-pathway-chat">
              <span className="home-pathway-number">01 / LẮNG NGHE</span>
              <span className="home-pathway-icon"><MessageCircleHeart aria-hidden="true" /></span>
              <strong>Muốn trò chuyện?</strong>
              <span className="home-pathway-description">Chia sẻ điều đang khiến bạn nghĩ ngợi, không cần chuẩn bị trước.</span>
              <span className="home-pathway-action">Mở cuộc trò chuyện <ArrowRight aria-hidden="true" /></span>
            </Link>
            <Link href="/resources" className="home-pathway home-pathway-resource" data-testid="link-home-pathway-resources">
              <span className="home-pathway-number">02 / TÌM HIỂU</span>
              <span className="home-pathway-icon"><BookOpen aria-hidden="true" /></span>
              <strong>Cần một góc tham khảo?</strong>
              <span className="home-pathway-description">Bài viết gần gũi về cảm xúc, học tập và cách chăm sóc bản thân.</span>
              <span className="home-pathway-action">Xem tài liệu <ArrowRight aria-hidden="true" /></span>
            </Link>
            <Link href="/career" className="home-pathway home-pathway-career" data-testid="link-home-pathway-career">
              <span className="home-pathway-number">03 / ĐỊNH HƯỚNG</span>
              <span className="home-pathway-icon"><Compass aria-hidden="true" /></span>
              <strong>Đang nghĩ về tương lai?</strong>
              <span className="home-pathway-description">Khám phá những hướng nghề nghiệp bắt đầu từ điều bạn quan tâm.</span>
              <span className="home-pathway-action">Khám phá hướng đi <ArrowRight aria-hidden="true" /></span>
            </Link>
            <Link href="/hotlines" className="home-pathway home-pathway-urgent" data-testid="link-home-pathway-hotlines">
              <span className="home-pathway-number">04 / HỖ TRỢ NGAY</span>
              <span className="home-pathway-icon"><PhoneCall aria-hidden="true" /></span>
              <strong>Cần người hỗ trợ khẩn cấp?</strong>
              <span className="home-pathway-description">Tìm các đường dây hỗ trợ và liên hệ phù hợp khi bạn cần.</span>
              <span className="home-pathway-action">Xem danh bạ hỗ trợ <ArrowRight aria-hidden="true" /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-proof" aria-label="Thông tin về Điểm Tựa">
        <div className="home-container home-proof-grid">
          <div className="home-proof-intro">
            <span className="home-kicker">ĐIỂM TỰA HỌC ĐƯỜNG</span>
            <h2>Một nơi nhỏ,<br /><em>nhiều cách giúp bạn.</em></h2>
          </div>
          <div className="home-proof-item">
            <span className="home-proof-icon"><MessageCircleHeart aria-hidden="true" /></span>
            <strong>Luôn có thể trò chuyện</strong>
            <p>Chatbot sẵn sàng lắng nghe bất cứ lúc nào, không phán xét.</p>
          </div>
          <div className="home-proof-item">
            <span className="home-proof-icon"><BookHeart aria-hidden="true" /></span>
            <strong>{statsLoading ? <Skeleton className="h-5 w-24" /> : <>{stats?.totalResources || 0}+ tài liệu</>}</strong>
            <p>Nội dung được chọn lọc để bạn hiểu mình và chăm sóc mình tốt hơn.</p>
          </div>
          <div className="home-proof-item">
            <span className="home-proof-icon home-proof-urgent"><PhoneCall aria-hidden="true" /></span>
            <strong>{statsLoading ? <Skeleton className="h-5 w-28" /> : <>{stats?.totalHotlines || 0}+ đầu mối hỗ trợ</>}</strong>
            <p>Danh bạ liên hệ để bạn tìm được hỗ trợ phù hợp khi cần.</p>
          </div>
        </div>
      </section>

      <section className="home-resources" aria-labelledby="home-resources-title">
        <div className="home-container">
          <div className="home-section-heading home-resource-heading">
            <div>
              <span className="home-kicker">ĐỌC THÊM, HIỂU MÌNH</span>
              <h2 id="home-resources-title">Góc tài liệu hữu ích</h2>
              <p>Những gợi ý nhỏ, để bạn có thêm cách gọi tên điều mình đang trải qua.</p>
            </div>
            <Link href="/resources" className="home-all-resources" data-testid="link-home-all-resources">
              Tất cả tài liệu <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="home-resource-grid">
            {resourcesLoading ? (
              Array.from({ length: 3 }, (_, index) => (
                <Card key={index} className="home-resource-card home-resource-skeleton">
                  <Skeleton className="h-44 w-full rounded-none" />
                  <CardHeader className="p-5">
                    <Skeleton className="mb-2 h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                  </CardHeader>
                  <CardContent className="px-5 pb-5 pt-0">
                    <Skeleton className="mb-2 h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))
            ) : featuredResources?.length ? (
              featuredResources.slice(0, 3).map((resource, index) => (
                <Link
                  key={resource.id}
                  href={`/resources/${resource.id}`}
                  className="home-resource-link"
                  data-testid={`link-home-resource-${resource.id}`}
                >
                  <Card className="home-resource-card">
                    <div className="home-resource-image">
                      {resource.imageUrl ? (
                        <img src={resource.imageUrl} alt={resource.title} />
                      ) : (
                        <div className={`home-resource-art home-resource-art-${index + 1}`}>
                          <BookHeart aria-hidden="true" />
                          <span>GÓC NHỎ<br />CHO BẠN</span>
                        </div>
                      )}
                      <span className="home-resource-read"><Clock aria-hidden="true" /> {resource.readMinutes} phút đọc</span>
                    </div>
                    <CardHeader className="home-resource-card-heading">
                      <span className="home-resource-category">{resource.category}</span>
                      <CardTitle className="home-resource-title">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="home-resource-card-content">
                      <CardDescription>{resource.summary}</CardDescription>
                      <span className="home-read-link">Đọc bài viết <ArrowRight aria-hidden="true" /></span>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="home-resource-empty">
                <BookOpen aria-hidden="true" />
                <div><strong>Góc tài liệu đang được chuẩn bị</strong><p>Bạn có thể ghé lại sau hoặc khám phá các nội dung khác.</p></div>
                <Link href="/resources">Khám phá tài liệu <ArrowRight aria-hidden="true" /></Link>
              </div>
            )}
          </div>
          <Link href="/resources" className="home-mobile-all" data-testid="link-home-all-resources-mobile">
            Xem tất cả tài liệu <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="home-emergency" aria-labelledby="home-emergency-title">
        <div className="home-container home-emergency-inner">
          <div className="home-emergency-symbol"><PhoneCall aria-hidden="true" /></div>
          <div className="home-emergency-copy">
            <span className="home-emergency-kicker">BẠN KHÔNG CẦN Ở MỘT MÌNH</span>
            <h2 id="home-emergency-title">Nếu bạn cần giúp đỡ ngay lúc này</h2>
            <p>Nếu bạn đang thấy không an toàn hoặc có ý nghĩ làm hại bản thân, hãy tìm một người lớn đáng tin cậy ở cạnh và liên hệ hỗ trợ chuyên nghiệp.</p>
          </div>
          <Link href="/hotlines" className="home-emergency-action" data-testid="link-home-emergency">
            <span>Xem danh bạ khẩn cấp</span><ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
