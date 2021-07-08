//로딩완료시 유튜브 데이터 호출
//유튜브 API AIzaSyDa7no_IeLyVAIkDXGY7pCkpWvye6BXywM

$.ajax({
    url:"https://www.googleapis.com/youtube/v3/playlistItems",
    dataType:"jsonp", 
    data:{
        part:"snippet", 
        key:"AIzaSyA0F0ptTQLFom0PeAY4PczQrp3IFy7vKd4", //api키값 
        maxResults : 4, //호출 갯수 
        playlistId: "PLEOccxVvmGjOke590-Qcgo0gsLvl9N24S" // 플레이리스트 아이디 
    }
})

.success(function(data){
    console.log(data.items);
    var items = data.items;
    //반복해서 만들 DOM문자열이 저장될 빈 문자열 전역변수 생성
    var result = "";

    //데이터의 갯수만큼 반복
    $(items).each(function(index,data){

        var title = data.snippet.title;
        
        if(title.length > 55){
            title = title.substr(0, 55)+"...";//글자를 자르는 substr
        }

        var con = data.snippet.description;

        if(con.length > 75){
            con = con.substr(0, 75)+"...";//글자를 자르는 substr
        }

        var date = data.snippet.publishedAt;
        date = date.split("T")[0];

        //빈 문자열에 계속해서 아래 문자코드 중첩해서 더함
        result += `
        <article>
                    <a href=${data.snippet.resourceId.videoId} class="pic">
                        <img src=${data.snippet.thumbnails.standard.url}>
                    </a>
                    <div class="con">
                        <h2>${title}</h2>
                        <p>${con}</p>
                        <span>${date}</span>
                    </div>
                </article>
        `;
    });

    //반복되며 중첩된 DOM생성 문자결과값을 .vidList에 삽입해서 DOM 생성
    $(".vidList").append(result);
})
.error(function(err){
    console.log(err);
});

$("body").on("click",".vidList article", function(e){
    e.preventDefault();
    var vidSrc = $(this).find(".pic").attr("href")
    $(".vidPop").fadeIn();
    $(".vidPop .inner").append(
        $("<iframe>").attr({
            src: "https://www.youtube.com/embed/"+vidSrc,
            frameborder : 0,
            allowfullscreen : true,
            width : "80%",
            height : "80%"
        })
    )
})

$("body").on("click", ".vidPop span", function(){
    $(this).parent().fadeOut(500, function(){
        $(this).find("iframe").remove();
    });
})