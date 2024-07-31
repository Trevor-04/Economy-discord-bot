const Cooldown = require('../../schemas/Cooldown');

module.exports = () =>{
    setInterval(async ()=> {
        try {
            const cooldowns = await Cooldown.find().select('endsAt');
            for(const cooldown of cooldowns){
                if(Date.now() < cooldown.endsAt()) return;

                await Cooldown.deleteOne({_id: cooldow._id});

            }
        } catch (error) {
            console.log(`Erorr clearing cooldowns ${error}`);
        }
    },3.6e6);
};