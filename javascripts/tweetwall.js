var megaquery='weiweicam';

(function($) {
  $.fn.scroller = function () {
    var list = this;
    list.items = [];
    
    list.push = function(items) {
      items.css('display', 'none').highlight('aiww').highlight('ai weiwei').highlight('#aiww').highlight(megaquery);
      items.each(function() {
        list.items.push(this);
      })
    }
    
    list.cleanup = function() {
      if(list.children().length > 30) {
        list.children().slice(0, 15).remove()
      }
    }
    
    var process = function() {
      $(list.items.shift()).appendTo(list).slideDown(8000);
      list.cleanup();
    }
    
    setInterval(process, 8000);
    return list;
  }
 
  var querytext = megaquery;
  
  if ( typeof realquerytext !== 'undefined' ) {
      querytext = realquerytext;
  } 

  var flickrquerytext;
  if ( typeof realflickrquerytext !== 'undefined' ) {
    flickrquerytext = encodeURIComponent(realflickrquerytext);
  } else {
    flickrquerytext = encodeURIComponent(megaquery);
  }

  var query = encodeURIComponent(querytext);

  var get_tweets_query = '../get-tweets-search.php?q=' + query;
 
  $(function() {
    tweets = $('#tweets').scroller();
    flicks = $('#flickr').scroller();

    function fetchTweets() {
      if(tweets.items.length < 15) {
          $.getJSON(get_tweets_query , function(data) {
          $.each(data.statuses, function() {  
            tweets.push($('<li><img class="profile" src="' + this.user.profile_image_url + '"/><span class="meta"><span class="from">' + this.user.screen_name + '</span> <span class="created_at">' + fmtDates(this.created_at) + '</span></span>' + inlinePics(this.text) + '</li>'))
           }); 
         });
      }
      setTimeout(fetchTweets, 8000);
    }
    
    jsonFlickrApi = function(data) {
      $.each(data.photos.photo, function(i,photo){
        //notice that "t.jpg" is where you change the
        //size of the image
        var t_url = "http://farm" + photo.farm + 
        ".static.flickr.com/" + photo.server + "/" + 
        photo.id + "_" + photo.secret + "_" + "m.jpg";

        var p_url = "http://www.flickr.com/photos/" + 
        photo.owner + "/" + photo.id;

        flicks.push($('<li><a href="' + p_url + '"><img src="' + t_url + '"/></a></li>'));
      });
    }

    function fetchFlicks() {
      var user_id = "";
      if ( typeof flickr_user_id !== 'undefined' ) {
          user_id = "&user_id=" + flickr_user_id;
      }
      var f_api = '99c91f41388ac416592ab3c00f181146';
      if ( typeof flickr_api !== 'undefined' ) {
          f_api = flickr_api;
      }

      var flick_url = "http://api.flickr.com/services/rest/?callback=?&format=json&method=flickr.photos.search&text=" + flickrquerytext + user_id + "&tag_mode=any&api_key=" + f_api + "&jsoncallback=jsonFlickrApi";
      if (flicks.items.length < 15) {
          $.getJSON(flick_url)
      }
      window.setTimeout(fetchFlicks, 120000);        
    }
         
    
    function inlinePics(text) {
      return text
        .replace(/http:\/\/twitpic\.com\/([\w\d]+)/, '<img src="http://twitpic.com/show/thumb/$1" class="twitpic">')
        .replace(/http:\/\/yfrog\.com\/([\w\d]+)/, '<img src="http://yfrog.com/$1.th.jpg" class="twitpic">')
        .replace(/http:\/\/pic\.im\/([\w\d]+)/, '<img src="http://pic.im/website/thumbnail/$1" class="twitpic">')
    }

    function fmtDates(datestring) {
        var d = new Date(datestring);
        if (!isNaN(d.getMonth())) {
            return d;
            // return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        } else {
            return "";
        }
    }
            
    fetchTweets();
    fetchFlicks();
  });
  
})(jQuery)

    
    // window.setInterval(showNext, 7000, '#tweets')
    // window.setInterval(showNext, 4000, '#flickr')
    // function moveit(element) {
    //   var top = $(element).position().top - 100;
    //   $(element).animate({top: top + 'px'}, {duration:5000, easing:'linear',
    //     complete: function() { moveit(element) }});
    // }
    // moveit('#tweets');
