<template>
    <div>
        <v-chip  label > Time Left</v-chip>
        <v-chip color="primary" label >{{timeLeft}}</v-chip>
    </div>
</template>
<script>
var intervalTimer;

export default {
    name: "examcontent",
    data(){
        return{
            examTime:this.$session.get("examtime") * 60,
            timeLeft: '00:00',
            duration: '00:00'
        }
    },
    methods:{
        setTimeLeft(seconds) {
            clearInterval(intervalTimer);
            this.timer(seconds);
        },
        timer(seconds) {
            const now = Date.now();
            const end = now + seconds * 1000;
            this.displayTimeLeft(seconds);
            this.countdown(end);
        },
        countdown(end) {
            intervalTimer = setInterval(() => {
                const secondsLeft = Math.round((end - Date.now()) / 1000);

                if(secondsLeft === 0) {
                    this.endTime = 0;
                }

                if(secondsLeft < 0) {
                    clearInterval(intervalTimer);
                    return;
                }
                this.displayTimeLeft(secondsLeft)
            }, 1000);
        },
        displayTimeLeft(secondsLeft) {
            const minutes = Math.floor((secondsLeft % 3600) / 60);
            const seconds = secondsLeft % 60;

            this.timeLeft = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;

            this.$session.set("timeleft", this.timeLeft)
            this.$session.set("secondsleft", secondsLeft)

            this.calcDuration(this.examTime - secondsLeft)
        },
        calcDuration(secondsLeft){
            const minutes = Math.floor((secondsLeft % 3600) / 60);
            const seconds = secondsLeft % 60;

            this.duration = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;
            this.$session.set("duration", this.duration)
        }

    },
    created(){
        if(this.$session.get("timeleft") == null){
            this.setTimeLeft(this.examTime);
            this.calcDuration(0)
         }else{
            this.setTimeLeft(this.$session.get("secondsleft"))
            this.calcDuration(this.examTime - parseInt(this.$session.get("secondsleft")))
         }
        
    }
}
function zeroPadded(num) {
    return num < 10 ? `0${num}` : num;
}

function hourConvert(hour) {
  // 15 --> 3
  return (hour % 12) || 12;
}
</script>