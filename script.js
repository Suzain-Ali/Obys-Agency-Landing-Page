function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
function loadingAnimation(){
    var tl = gsap.timeline()
tl.from(".line h1", {
    y:150,
    stagger:0.25,
    duration:0.6,
    delay:0.5,
})
tl.from("#line1-part1 ",{
    opacity:0,
    onStart:function(){
        var h5timer=document.querySelector("#line1-part1 h5");
        var grow=0;
        var int =setInterval(function(){
             if(grow>=100){
                h5timer.textContent=grow;
             }
             else{
                grow++;
                h5timer.textContent=grow;
             }
        },35)
    }
})
tl.to(" .line h2",{
    animationName:"anime",
    opacity:1
})
tl.to(".loader",{
    opacity:0,
    duration:0.4,
    delay:4
})
tl.from("#page1",{
    y:1200,
    opacity:0,
    delay:0.2,
    ease:Power4
})
tl.to(".loader",{
    display:"none"
})
tl.from("#nav",{
    opacity:0
})
tl.from(" .hero h1 ",{
    y:120,
    stagger:0.2
})
tl.from(" #hero1 , #page2 ",{
    opacity:0
},"-=1.2")
}
function cursorAnimation(){
    Shery.mouseFollower({
        skew:true,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration:1
    });
    Shery.makeMagnet(".nav-part2 h4" , {});
    var videocontainer=document.querySelector("#video");
    var video=document.querySelector("#video video");
    videocontainer.addEventListener("mouseenter",function(){
        videocontainer.addEventListener("mousemove",function(dets){
            gsap.to(".mousefollower",{
                opacity:0
            })
            console.log(dets)
             gsap.to("#video-crs",{
                  left:dets.x - 400,
                  y:dets.y - 280
             })
        })
    })
    videocontainer.addEventListener("mouseleave",function(){
          gsap.to(".mousefollower" , {
            opacity:1
          })
          gsap.to("#video-crs",{
           top:"-4.9%",
           left:"80%"
       })
    })

    var flag=0;
    videocontainer.addEventListener("click" , function() {
        if(flag==0){
            video.play()
            video.style.opacity = 1
            document.querySelector("#video-crs").innerHTML = `<i class="ri-pause-mini-fill"></i>`
            gsap.to("#video-crs", {
            scale:0.5
        })
        flag= 1
        }
        else{
            video.pause()
            video.style.opacity = 0
            document.querySelector("#video-crs").innerHTML = `<i class="ri-play-mini-fill"></i>`
            gsap.to("#video-crs", {
            scale:1
        })
        flag= 0
        }
    })
}
function sheryAnimation(){
    Shery.imageEffect(".image-div", {
        style:5,
        gooey:true
})}
loadingAnimation();
cursorAnimation();
locomotiveAnimation();
sheryAnimation();