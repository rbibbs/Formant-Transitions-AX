
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
            "practiceglide",
            "stoptransition",
            "practiceglottal",
            "frictransition",
            "practiceall",
            // "practiceglottal",
            // "practiceh",
            "experimentstart",
            randomize("transitionsAX") ,
            "break1",
            randomize("transitionsAX") ,
            "break2",
            randomize("transitionsAX") ,
            "questions",
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
    
    newText(`<p>Welcome! In this experiment, you will hear pairs of sounds and will decide whether those sounds are the same length, or different lengths.</p><p> You will press a key to respond whether you think the pair of sounds are of the same length, or different lengths.</p><p>
            PRESS the 'f' key if the pair of sounds are the same length.</p><p>
            PRESS the 'j' key if the pair of sounds are of different lengths.</p><p>
            Try to respond quickly and accurately. If you wait more than 2 seconds, you will not be able to respond.</p><p>
            Before you begin, you will have a chance to practice and get familiar with the buttons.</p><p>
            <strong>Please use wired headphones/earphones if possible and ensure that your volume is loud enough to comfortably and clearly hear the sounds.</strong></p>`)
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

    newText(`<p>We'll begin with a little bit of practice! </p><p> As a reminder, you will hear a pair of sounds and decide whether or not the sounds are the same length or different lengths.</p><p>
            PRESS the 'f' key if the pair of sounds are the same length.</p><p>
            PRESS the 'j' key if the par of sounds are different lengths.</p><p><b>
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

Template("practicestopAX.csv",
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
        newTimer("ISIbetween", 400)
        ,
        

        newAudio("audio1",  currentrow.audio1).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        ( currentrow.audio2== currentrow.audio1?getAudio("audio1"):newAudio("audio2",  currentrow.audio2)).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        
        newCanvas("discrimination", 800, 200)
            .add(225,0,
                newText("whichpair", `Were the two sounds of same or different lengths?`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(0,100,
                newText("same", `<p><strong>Same</strong></p><p>
                'F'`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(700,100,
                newText("different", `<p><strong>Different</strong></p><p>
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
            .callback( getVar("RT").set( v => Date.now() - v ))
        ,
        

        
        getTimer("cutoff")
        .wait()
        ,    
    
        getKey("cur.response")    
            .test.pressed()
            .success(getKey("cur.response").test.pressed(currentrow.correctresponse)
            .success(newText("answer", "Correct! The answer is "+currentrow.samediff+`<p>
                Press SPACEBAR to move on.</p>`)
                .log()
                .print()
                .settings.center()
                .cssContainer({"font-size": "140%", "color": "blue"})
                .css("text-align","center")
                ,
                getCanvas("discrimination").remove(),
                newKey("spacebar" , " ")
                    .wait()
                    )
            .failure(newText("answer", "Incorrect! The answer is "+currentrow.samediff+`<p>
                Press SPACEBAR to move on.</p>`)
                .log()
                .print()
                .settings.center()
                .cssContainer({"font-size": "140%", "color": "blue"})
                .css("text-align","center")
                ,
                getCanvas("discrimination").remove(),
                newKey("spacebar" , " ")
                    .wait()
                    )
            )
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
  .log("samediff", currentrow.samediff)
  .log("consonant", currentrow.consonant)
  .log("vowels", currentrow.vowels)
  .log("recording", currentrow.recording)
  .log( "RT"   ,getVar("RT") )
)



newTrial("stoptransition",

    newText(`<p>Good work! Those sounds were the same length, so you should have pressed the 'f' key.</p>
            <p> Let's try another! </p>
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



newTrial("frictransition",

    newText(`<p>Good work! Those sounds were of different length, so you should have pressed the 'j' key. </p>
            <p> Let's try a couple more; you'll be told the right answer after you respond to the next few! </p>
            <p> Remember to press 'f' if the sounds are the same length, and 'j' if the sounds are different length.
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

newTrial("experimentstart",

    newText(`<p>Good work! Now that we're done with practice, let's start the experiment! </p>
            <p>Please use wired headphones/earphones if possible, and ensure your volume is loud enough to comfortably and clearly hear the sounds.</p>
            <p> Remember to press 'f' if the sounds are the same length, and 'j' if the sounds are different length.
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


Template("practicefricativeAX.csv",
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
        newTimer("ISIbetween", 400)
        ,
        

        newAudio("audio1", currentrow.audio1).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        ( currentrow.audio2== currentrow.audio1?getAudio("audio1"):newAudio("audio2",  currentrow.audio2)).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        
        newCanvas("discrimination", 800, 200)
            .add(225,0,
                newText("whichpair", `Were the two sounds of same or different lengths?`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(0,100,
                newText("same", `<p><strong>Same</strong></p><p>
                'F'`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(700,100,
                newText("different", `<p><strong>Different</strong></p><p>
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
            .callback( getVar("RT").set( v => Date.now() - v ))
        ,
        

        
        getTimer("cutoff")
        .wait()
        ,    
    
        getKey("cur.response")    
            .test.pressed()
            .success(getKey("cur.response").test.pressed(currentrow.correctresponse)
            .success(newText("answer", "Correct! The answer is "+currentrow.samediff+`<p>
                Press SPACEBAR to move on.</p>`)
                .log()
                .print()
                .settings.center()
                .cssContainer({"font-size": "140%", "color": "blue"})
                .css("text-align","center")
                ,
                getCanvas("discrimination").remove(),
                newKey("spacebar" , " ")
                    .wait()
                    )
            .failure(newText("answer", "Incorrect! The answer is "+currentrow.samediff+`<p>
                Press SPACEBAR to move on.</p>`)
                .log()
                .print()
                .settings.center()
                .cssContainer({"font-size": "140%", "color": "blue"})
                .css("text-align","center")
                ,
                getCanvas("discrimination").remove(),
                newKey("spacebar" , " ")
                    .wait()
                    )
            )
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
  .log("samediff", currentrow.samediff)
  .log("consonant", currentrow.consonant)
  .log("vowels", currentrow.vowels)
  .log("recording", currentrow.recording)
  .log( "RT"   ,getVar("RT") )
    

)

Template("practiceglide.csv",
currentrow =>
newTrial("practiceglide",

newText("tooslow", "Too slow!")
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "24px")
        ,
        
            
        newTimer("wait", 1000)
            .start()
            .wait()
        ,
        newTimer("ISIbetween", 400)
        ,
        

        newAudio("audio1",  currentrow.audio1).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        ( currentrow.audio2== currentrow.audio1?getAudio("audio1"):newAudio("audio2",  currentrow.audio2)).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        
        newCanvas("discrimination", 800, 200)
            .add(225,0,
                newText("whichpair", `Were the two sounds of same or different lengths?`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(0,100,
                newText("same", `<p><strong>Same</strong></p><p>
                'F'`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(700,100,
                newText("different", `<p><strong>Different</strong></p><p>
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
            .callback( getVar("RT").set( v => Date.now() - v ))
        ,
        

        
        getTimer("cutoff")
        .wait()
        ,    
    
        getKey("cur.response")    
            .test.pressed()
            .success(getKey("cur.response").test.pressed(currentrow.correctresponse)
            .success(newText("answer", "Correct! The answer is "+currentrow.samediff+`<p>
                Press SPACEBAR to move on.</p>`)
                .log()
                .print()
                .settings.center()
                .cssContainer({"font-size": "140%", "color": "blue"})
                .css("text-align","center")
                ,
                getCanvas("discrimination").remove(),
                newKey("spacebar" , " ")
                    .wait()
                    )
            .failure(newText("answer", "Incorrect! The answer is "+currentrow.samediff+`<p>
                Press SPACEBAR to move on.</p>`)
                .log()
                .print()
                .settings.center()
                .cssContainer({"font-size": "140%", "color": "blue"})
                .css("text-align","center")
                ,
                getCanvas("discrimination").remove(),
                newKey("spacebar" , " ")
                    .wait()
                    )
            )
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
  .log("samediff", currentrow.samediff)
  .log("consonant", currentrow.consonant)
  .log("vowels", currentrow.vowels)
  .log("recording", currentrow.recording)
  .log( "RT"   ,getVar("RT") )
    

)

Template("practiceglottal.csv",
currentrow =>
newTrial("practiceglottal",

newText("tooslow", "Too slow!")
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "24px")
        ,
        
            
        newTimer("wait", 1000)
            .start()
            .wait()
        ,
        newTimer("ISIbetween", 400)
        ,
        

        newAudio("audio1",  currentrow.audio1).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        ( currentrow.audio2== currentrow.audio1?getAudio("audio1"):newAudio("audio2",  currentrow.audio2)).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        
        newCanvas("discrimination", 800, 200)
            .add(225,0,
                newText("whichpair", `Were the two sounds of same or different lengths?`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(0,100,
                newText("same", `<p><strong>Same</strong></p><p>
                'F'`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(700,100,
                newText("different", `<p><strong>Different</strong></p><p>
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
            .callback( getVar("RT").set( v => Date.now() - v ))
        ,
        

        
        getTimer("cutoff")
        .wait()
        ,    
    
        getKey("cur.response")    
            .test.pressed()
            .success(getKey("cur.response").test.pressed(currentrow.correctresponse)
            .success(newText("answer", "Correct! The answer is "+currentrow.samediff+`<p>
                Press SPACEBAR to move on.</p>`)
                .log()
                .print()
                .settings.center()
                .cssContainer({"font-size": "140%", "color": "blue"})
                .css("text-align","center")
                ,
                getCanvas("discrimination").remove(),
                newKey("spacebar" , " ")
                    .wait()
                    )
            .failure(newText("answer", "Incorrect! The answer is "+currentrow.samediff+`<p>
                Press SPACEBAR to move on.</p>`)
                .log()
                .print()
                .settings.center()
                .cssContainer({"font-size": "140%", "color": "blue"})
                .css("text-align","center")
                ,
                getCanvas("discrimination").remove(),
                newKey("spacebar" , " ")
                    .wait()
                    )
            )
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
  .log("samediff", currentrow.samediff)
  .log("consonant", currentrow.consonant)
  .log("vowels", currentrow.vowels)
  .log("recording", currentrow.recording)
  .log( "RT"   ,getVar("RT") )
    

)


Template("practiceh.csv",
currentrow =>
newTrial("practiceh",

newText("tooslow", "Too slow!")
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "24px")
        ,
        
            
        newTimer("wait", 1000)
            .start()
            .wait()
        ,
        newTimer("ISIbetween", 400)
        ,
        

        newAudio("audio1",  currentrow.audio1).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        ( currentrow.audio2== currentrow.audio1?getAudio("audio1"):newAudio("audio2",  currentrow.audio2)).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        
        newCanvas("discrimination", 800, 200)
            .add(225,0,
                newText("whichpair", `Were the two sounds of same or different lengths?`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(0,100,
                newText("same", `<p><strong>Same</strong></p><p>
                'F'`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(700,100,
                newText("different", `<p><strong>Different</strong></p><p>
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
            .callback( getVar("RT").set( v => Date.now() - v ))
        ,
        

        
        getTimer("cutoff")
        .wait()
        ,    
    
        getKey("cur.response")    
            .test.pressed()
            .success(getKey("cur.response").test.pressed(currentrow.correctresponse)
            .success(newText("answer", "Correct! The answer is "+currentrow.samediff+`<p>
                Press SPACEBAR to move on.</p>`)
                .log()
                .print()
                .settings.center()
                .cssContainer({"font-size": "140%", "color": "blue"})
                .css("text-align","center")
                ,
                getCanvas("discrimination").remove(),
                newKey("spacebar" , " ")
                    .wait()
                    )
            .failure(newText("answer", "Incorrect! The answer is "+currentrow.samediff+`<p>
                Press SPACEBAR to move on.</p>`)
                .log()
                .print()
                .settings.center()
                .cssContainer({"font-size": "140%", "color": "blue"})
                .css("text-align","center")
                ,
                getCanvas("discrimination").remove(),
                newKey("spacebar" , " ")
                    .wait()
                    )
            )
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
  .log("samediff", currentrow.samediff)
  .log("consonant", currentrow.consonant)
  .log("vowels", currentrow.vowels)
  .log("recording", currentrow.recording)
  .log( "RT"   ,getVar("RT") )
    

)

Template("practiceall.csv",
currentrow =>
newTrial("practiceall",

newText("tooslow", "Too slow!")
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "24px")
        ,
        
            
        newTimer("wait", 1000)
            .start()
            .wait()
        ,
        newTimer("ISIbetween", 400)
        ,
        

        newAudio("audio1",  currentrow.audio1).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        ( currentrow.audio2== currentrow.audio1?getAudio("audio1"):newAudio("audio2",  currentrow.audio2)).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        
        newCanvas("discrimination", 800, 200)
            .add(225,0,
                newText("whichpair", `Were the two sounds of same or different lengths?`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(0,100,
                newText("same", `<p><strong>Same</strong></p><p>
                'F'`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(700,100,
                newText("different", `<p><strong>Different</strong></p><p>
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
            .callback( getVar("RT").set( v => Date.now() - v ))
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
  .log("samediff", currentrow.samediff)
  .log("consonant", currentrow.consonant)
  .log("vowels", currentrow.vowels)
  .log("recording", currentrow.recording)
  .log( "RT"   ,getVar("RT") )
    

)




newTrial("break1",

    newText(`<p>Time for a break!</p><p>
            Please take 30 seconds to rest and reset, and <b>press SPACEBAR to continue the experiment.</b></p><p>`)
            .center()
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print()
    ,
     

           
    newKey("move-on", " ")
    .wait()
    .remove()
);

newTrial("break2",

    newText(`<p>Time for a break!</p><p>
            Please take 30 seconds to rest and reset, and <b>press SPACEBAR to continue the experiment.</b></p><p>`)
            .center()
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "16px")
            .print()
    ,
     

           
    newKey("move-on", " ")
    .wait()
    .remove()
);



Template("transitions_AX.csv",
currentrow =>
newTrial("transitionsAX",

newText("tooslow", "Too slow!")
            .css("font-family", "Helvetica, sans-serif")
            .css("font-size", "24px")
        ,
        
            
        newTimer("wait", 1000)
            .start()
            .wait()
        ,
        newTimer("ISIbetween", 400)
        ,
        

        newAudio("audio1",  currentrow.audio1).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        ( currentrow.audio2== currentrow.audio1?getAudio("audio1"):newAudio("audio2",  currentrow.audio2)).play()
        .wait()
        ,
        getTimer("ISIbetween").start()
        .wait()
        ,
        
        newCanvas("discrimination", 800, 200)
            .add(225,0,
                newText("whichpair", `Were the two sounds of same or different lengths?`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(0,100,
                newText("same", `<p><strong>Same</strong></p><p>
                'F'`).cssContainer({"font-size": "150%", "color": "black"})
                .css("text-align","center"))
            .add(700,100,
                newText("different", `<p><strong>Different</strong></p><p>
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
            .callback( getVar("RT").set( v => Date.now() - v ))
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
  .log("samediff", currentrow.samediff)
  .log("consonant", currentrow.consonant)
  .log("vowels", currentrow.vowels)
  .log("recording", currentrow.recording)
  .log( "RT"   ,getVar("RT") )
    

)


SendResults("send");

newTrial("end",
    exitFullscreen()
    ,
    newText(`<p>Thank you for your participation! </p>
            <p><strong> Study Completion Code: </strong></p>`)
        .css("font-family", "Helvetica, sans-serif")
        .css("font-size", "20px")
        .center()
        .print("center at 50%")
    ,
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
.setOption("countsForProgressBar",false);