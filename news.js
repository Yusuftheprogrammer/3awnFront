// تحميل الأخبار من News API
async function loadNewsFromAPI() {
  const apiKey = "ed60c1fedc014479992625a8ae974c4e";
  const newsContainer = document.getElementById("newsContainer");
  
  newsContainer.innerHTML = `<div style="text-align: center; padding: 20px;"><p>جاري تحميل الأخبار...</p></div>`;
  
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?language=ar&pageSize=5&apiKey=${apiKey}`);
    const data = await response.json();

    if (data.status === "ok" && data.articles.length > 0) {
      newsContainer.innerHTML = data.articles.map((article, index) => `
        <div class="New ${index === 0 ? 'One' : index === 1 ? 'Two' : 'Three'}" style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 10px; cursor: pointer;" onclick="window.open('${article.url}', '_blank')">
          <h4>${article.title}</h4>
          <p style="color: #666;">${article.description || ''}</p>
          <p style="color: #999; font-size: 12px;">${article.source.name} - ${new Date(article.publishedAt).toLocaleDateString('ar-SA')}</p>
        </div>
      `).join('');
    } else {
      newsContainer.innerHTML = `<div style="text-align: center; padding: 20px;"><p>لا توجد أخبار متاحة</p></div>`;
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = `<div style="text-align: center; padding: 20px;"><p>حدث خطأ في تحميل الأخبار</p></div>`;
  }
}

// استدعاء الدالة عند تحميل الصفحة
loadNewsFromAPI();
