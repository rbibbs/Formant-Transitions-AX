// This is a PCIbex implementation of the English phoneme categorization task from Lab 1 in Colin Phillips' Psycholinguistics I class at the University of Maryland. The The original lab is available at http://www.colinphillips.net/teaching/4237-2/3154-2/

// This is a PCIbex implementation of the English phoneme categorization task from Lab 1 in Colin Phillips' Psycholinguistics I class at the University of Maryland. The The original lab is available at http://www.colinphillips.net/teaching/4237-2/3154-2/
// We ask that if you use this code, you please credit Colin Phillips' 
// Psycholinguistics class, at the University of Maryland. See: www.colinphillips.net

// The Russian stimuli were created for
// Kazanina, Phillips & Idsardi. (2006). The influence of meaning on the perception of speech sounds. PNAS. 103(30), 11381-11386.
// If you use the Russian stimuli, please cite Kazanina et al (2006).

PennController.ResetPrefix(null) // Shorten command names (keep this)PennController.DebugOff()
// PennController.DebugOff()

// Resources are hosted as ZIP files on a distant server

Sequence(
            "welcome",
            // "demographic",
            "instructions",
            "preloadPractice",
            "preloadTest",
            "practiceintro",
            "practicestop",
            "stoptransition",
            "practicefricative",
            "frictransition",
            randomize("chap3exp1") ,
            "break1",
            randomize("chap3exp1") ,
             "send" ,
             "end" )

// CheckPreloaded( startsWith("practice") )
//     .label( "preloadPractice" );
// CheckPreloaded( startsWith("G") )
//     .label( "preloadTest" );

newTrial("welcome",

    // fullscreen(),
    newHtml("welcome", "welcome.html")
        .log()
        //.size(1000,1000)
        .print()
    ,
    newButton("continue", "Continue to the next page")
        .center()
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .print()
        .wait(
            getHtml("welcome").test.complete()
                .failure( getHtml("welcome").warn() )
        )
)

newTrial("demographic",

    // fullscreen(),
    newHtml("demographic", "demographic-survey.html")
        .log()
        .print()
    ,
    newButton("continue", "Continue to the next page")
        .center()
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .print()
        .wait(
            getHtml("demographic").test.complete()
                .failure( getHtml("demographic").warn() )
        )
)

newTrial("questions",

    // fullscreen(),
    newHtml("debrief", "debrief.html")
        .log()
        .print()
    ,
     newButton("continue", "Continue to the next page")
        .center()
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .print()
        .wait(
            getHtml("debrief").test.complete()
                .failure( getHtml("debrief").warn() )
        )
)

// Welcome page: we do a first calibration here---meanwhile, the resources are preloading
newTrial("instructions",

    fullscreen(),
    
    newText(`<p>Welcome! In this experiment, you will hear pairs of sounds where one is a pair of the same sound and one is a pair of different sounds differing by length. </p><p> You will hear two pairs of sounds, and you will press a key to indicate which pair of sounds was the different pair.</p><p>
            PRESS the 'f' key if the first pair of sounds was the different pair.</p><p>
            PRESS the 'j' key if the second pair of sounds was the different pair.</p><p>
            Try to respond quickly and accurately. If you wait more than 2 seconds, you will not be able to respond.</p><p>
            Before you begin, you will have a chance to practice and get familiar with the buttons.</p><p>
            <strong>Please use headphones/earphones if possible.</strong></p>`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "middle at 50%")
    ,
    newButton("Click when you are ready to begin")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 80%")
        .wait()
        .remove()
);





newTrial("practiceintro",

    newText(`<p>We'll begin with a little bit of practice! </p><p> As a reminder, you will hear two pairs of words, and you will press a key to indicate which is the different pair of sounds by length.</p><p>
            PRESS the 'f' key if the first pair you hear is different.</p><p>
            PRESS the 'j' key if the second pair you hear is different.</p><p><b>
            Try to respond quickly and accurately. If you wait more than 2 seconds, you will not be able to respond.</p><p>
            </p>`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "middle at 50%")
    ,
    newButton("Click when you are ready to begin the practice")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 80%")
        .wait()
        .remove()

);

Template("practicestop.csv",
currentrow =>
newTrial("practicestop",

newText("tooslow", "Too slow!")
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "24px")
        ,
        
            
        newTimer("wait", 1000)
            .start()
            .wait()
        ,
        newTimer("ISIwithin", 150)
        ,
        newTimer("ISIbetween", 550)
        ,
        

        newAudio("audio1", "http://localhost:3000/server.py?resource=" + currentrow.audio1).play()
        .wait()
        ,
        getTimer("ISIwithin").start()
        .wait()
        ,
        ("http://localhost:3000/server.py?resource=" + currentrow.audio2=="http://localhost:3000/server.py?resource=" + currentrow.audio1?getAudio("audio1"):newAudio("audio2", "http://localhost:3000/server.py?resource=" + currentrow.audio2)).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        newAudio("audio3","http://localhost:3000/server.py?resource=" + currentrow.audio3).play()
        .wait()
        ,
        getTimer("ISIwithin").start()
        .wait()
        ,
        (currentrow.audio4==currentrow.audio3?getAudio("audio3"):newAudio("audio4", "http://localhost:3000/server.py?resource=" + currentrow.audio4)).play()
        .wait()
        ,
        
        newCanvas("discrimination", 800, 200)
            .add(225,0,
                newText("whichpair", `Which pair of sounds was different?`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(0,100,
                newText("firstpair", `<p><strong>First pair</strong></p><p>
                'F'`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(700,100,
                newText("secondpair", `<p><strong>Second pair</strong></p><p>
                'J'`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .center()
            .print()
        ,

        newVar("RT")
            .global()
            .set( v => Date.now() ) // Date.now essentially gets the current timestamp
        ,

        newTimer("cutoff", 2000)
        .start()
        ,

        newKey("cur.response", "FJ")
            .log("all") // this will log the first key press
            .callback( getTimer("cutoff").stop()  )
        ,
        

        
        getTimer("cutoff")
        .wait()
        ,    
    
        getKey("cur.response")    
            .test.pressed()
            .failure(newText("slow", `<p>Too slow.</p><p>
                Press SPACEBAR to move on.</p>`)
                .log()
                .print()
                .settings.center()
                .cssContainer({"font-size": "140%", "color": "red"})
                .css("text-align","center")
                ,
                getCanvas("discrimination").remove(),
                newKey("spacebar" , " ")
                    .wait()
            )


    )
  .log( "presentation"   , currentrow.presentation)
  .log("different", currentrow.different)
  .log("consonant", currentrow.consonant)
  .log( "RT"   ,getVar("RT") )
    

)


newTrial("transition",

    newText(`<p>Good work! The first pair of sounds were different, so you should have pressed the 'f' key.</p>
            <p> Let's try another before starting the experiment. </p>
            </p>`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "middle at 50%")
    ,
    newButton("Click when you are ready to move to the next practice")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 80%")
        .wait()
        .remove()

)


Template("practicefricative.csv",
currentrow =>
newTrial("practicefricative",

newText("tooslow", "Too slow!")
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "24px")
        ,
        
            
        newTimer("wait", 1000)
            .start()
            .wait()
        ,
        newTimer("ISIwithin", 150)
        ,
        newTimer("ISIbetween", 550)
        ,
        

        newVar("RT")
            .global()
            .set( v => Date.now() ) // Date.now essentially gets the current timestamp
        , 

        newAudio("audio1","http://localhost:3000/server.py?resource=" + currentrow.audio1).play()
        .wait()
        ,
        getTimer("ISIwithin").start()
        .wait()
        ,
        (currentrow.audio2==currentrow.audio1?getAudio("audio1"):newAudio("audio2", "http://localhost:3000/server.py?resource=" + currentrow.audio2)).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        newAudio("audio3","http://localhost:3000/server.py?resource=" + currentrow.audio3).play()
        .wait()
        ,
        getTimer("ISIwithin").start()
        .wait()
        ,
        (currentrow.audio4==currentrow.audio3?getAudio("audio3"):newAudio("audio4", "http://localhost:3000/server.py?resource=" + currentrow.audio4)).play()
        .wait()
        ,
        
        newCanvas("discrimination", 800, 200)
            .add(225,0,
                newText("whichpair", `Which pair of sounds was different?`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(0,100,
                newText("firstpair", `<p><strong>First pair</strong></p><p>
                'F'`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(700,100,
                newText("secondpair", `<p><strong>Second pair</strong></p><p>
                'J'`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .center()
            .print()
        ,
        
        newVar("RT")
            .global()
            .set( v => Date.now() ) // Date.now essentially gets the current timestamp
        ,
        
        newTimer("cutoff", 2000)
        .start()
        ,
        

        newKey("cur.response", "FJ")
            .log("all") // this will log the first key press
            .callback( getTimer("cutoff").stop()  )
            .callback( getVar("RT").set( v => Date.now() - v )) // here is where we can subtract the more recent timestep (after hitting a key) from the old timestamp v; this gets you RT in terms of time to press button
        ,
        

        
        getTimer("cutoff")
        .wait()
        ,    
    
        getKey("cur.response")    
            .test.pressed()
            .failure(newText("slow", `<p>Too slow.</p><p>
                Press SPACEBAR to move on.</p>`)
                .log()
                .print()
                .settings.center()
                .cssContainer({"font-size": "140%", "color": "red"})
                .css("text-align","center")
                ,
                getCanvas("discrimination").remove(),
                newKey("spacebar" , " ")
                    .wait()
            )


    )
  .log( "presentation"   , currentrow.presentation)
  .log("different", currentrow.different)
  .log("consonant", currentrow.consonant)
  .log( "RT"   ,getVar("RT") )
    

)


newTrial("frictransition",

    newText(`<p>Good work! The first pair was different (again!), so you should have pressed the 'f' key. </p>
            <p> You should now be ready to officially begin the experiment! </p>
            <p> There will be a couple of breaks throughout the experiment. </p>
            <p> Remember to press 'f' when the first pair is different, and 'j' when the second pair is different. Good luck!
            </p>`)
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print("center at 50%", "middle at 50%")
    ,
    newButton("Click here to begin the experiment. Have fun!")
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "16px")
        .center()
        .print("center at 50%", "bottom at 70%")
        .wait()
        .remove()

)


newTrial("break1",

    newText(`<p>Time for a break!</p><p>
            Please enjoy this comic, and <b>press SPACEBAR to continue the experiment.</b></p><p>`)
            .center()
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print()
    ,
     
    newImage("hobbes1", "http://localhost:3000/server.py?resource=ch210511.gif")
    .size(800,250)
    .center()
    .print()
    ,
           
    newKey("move-on", " ")
    .wait()
    .remove()
);

newTrial("break2",

    newText(`<p>Time for a break!</p><p>
            Please enjoy this comic, and <b>press SPACEBAR to continue the experiment.</b></p><p>`)
            .center()
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print()
    ,
     
    newImage("hobbes1", "http://localhost:3000/server.py?resource=ch210607.gif")
    .size(800,250)
    .center()
    .print()
    ,
           
    newKey("move-on", " ")
    .wait()
    .remove()
);



Template( "chap3_exp1.csv",
    currentrow => 
    newTrial("chap3exp1",
    
        newText("tooslow", "Too slow!")
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "24px")
        ,
        
            
        newTimer("wait", 1000)
            .start()
            .wait()
        ,
        newTimer("ISIwithin", 150)
        ,
        newTimer("ISIbetween", 550)
        ,
        

        newAudio("audio1","http://localhost:3000/server.py?resource=" + currentrow.audio1).play()
        .wait()
        ,
        getTimer("ISIwithin").start()
        .wait()
        ,
        (("http://localhost:3000/server.py?resource=" + currentrow.audio2)==("http://localhost:3000/server.py?resource=" + currentrow.audio1)?getAudio("audio1"):newAudio("audio2", "http://localhost:3000/server.py?resource=" + currentrow.audio2)).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        newAudio("audio3","http://localhost:3000/server.py?resource=" + currentrow.audio3).play()
        .wait()
        ,
        getTimer("ISIwithin").start()
        .wait()
        ,
        ("http://localhost:3000/server.py?resource=" + currentrow.audio4=="http://localhost:3000/server.py?resource=" + currentrow.audio3?getAudio("audio3"):newAudio("audio4", "http://localhost:3000/server.py?resource=" + currentrow.audio4)).play()
        .wait()
        ,
        
        newCanvas("discrimination", 800, 200)
            .add(225,0,
                newText("whichpair", `Which pair of sounds was different?`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(0,100,
                newText("firstpair", `<p><strong>First pair</strong></p><p>
                'F'`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(700,100,
                newText("secondpair", `<p><strong>Second pair</strong></p><p>
                'J'`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .center()
            .print()
        ,

        newVar("RT")
            .global()
            .set( v => Date.now() ) // Date.now essentially gets the current timestamp
        ,

        newTimer("cutoff", 2000)
        .start()
        ,

         newKey("cur.response", "FJ")
            .log("all") // this will log the first key press
            .callback( getTimer("cutoff").stop()  )
            .callback( getVar("RT").set( v => Date.now() - v )) // here is where we can subtract the more recent timestep (after hitting a key) from the old timestamp v; this gets you RT in terms of time to press button
        ,
        

        
        getTimer("cutoff")
        .wait()
        ,    
    
        getKey("cur.response")    
            .test.pressed()
            .failure(newText("slow", `<p>Too slow.</p><p>
                Press SPACEBAR to move on.</p>`)
                .log()
                .print()
                .settings.center()
                .cssContainer({"font-size": "140%", "color": "red"})
                .css("text-align","center")
                ,
                getCanvas("discrimination").remove(),
                newKey("spacebar" , " ")
                    .wait()
            )


    )
  .log( "presentation"   , currentrow.presentation)
  .log("different", currentrow.different)
  .log("consonant", currentrow.consonant)
  .log( "RT"   ,getVar("RT") )
);


SendResults("send");

newTrial("end",
    exitFullscreen()
    ,
    newText(`<p>Thank you for your participation! </p>`)
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "20px")
        .center()
        .print("center at 50%")
    ,
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
.setOption("countsForProgressBar",false);