const express = require('express');
const router  = express.Router();
const User = require('../models/user-model');
const Places = require('../models/places');
const Events = require('../models/events')
const axios = require('axios')
const Chat = require('../models/chats');
const Message = require('../models/message');

/* GET home page */
router.post('/createEvent', async (req,res,next)=>{
  try{
    if(req.user){
      if(req.user.isAcquaintance){
        const place = await Places.findOne({name: req.body.location})
        let attendees = [];
        attendees.push(req.user._id)
        const newChat = await new Chat({participants: req.user});
        const newEvent = await new Events({
          owner: req.user,
          location: place._id,
          description: req.body.description,
          time: req.body.time,
          title: req.body.title,
          attendees: [...attendees],
          discussion: newChat
        })
        await newEvent.save();
        await newChat.save();
        await User.findByIdAndUpdate(req.user._id,{$push: {hostedEvents: newEvent._id, upcomingEvents: newEvent._id}})
        const me = await User.findById(req.user._id).populate('upcomingEvents').populate('pastEvents').populate('hostedEvents').populate('favoritePlaces').populate({path: 'upcomingEvents', populate: {path: 'location'}})
        res.json({updated: me})
      }else{
        res.json({message: "You must be registered as an Acquaintance to use this feature"})
        return;
      }
    }else{
      res.json({message: "Must be logged in to use this feature"})
      return;
    }
  }catch(err){
    res.json(err);
  }
})
router.post('/deleteEvent/:id',async (req,res,next)=>{
  try{
    const event = await Events.findByIdAndDelete(req.params.id)
    res.json({message: 'deleted'})
  }catch(err){
    res.json(err);
  }
})
router.post('/editEvent/:id',async (req,res,next)=>{
  try{
    const place = await Places.findOne({name: req.body.location})
    const event = await Events.findByIdAndUpdate(req.params.id,{
      title: req.body.title,
      description: req.body.description,
      time: req.body.time,
      location: place
    })
    const updatedEvent = await Events.findById(req.params.id).populate('location').populate('owner').populate('attendees').populate('discussion').populate({ path: 'discussion', populate: { path: 'participants' } }).populate({path: 'discussion', populate: {path: 'messages'}}).populate({path: 'discussion', populate: {path: 'messages', populate: {path: 'createdBy'}}})
    console.log(updatedEvent)
    res.json(updatedEvent)
  }catch(err){
    res.json(err)
  }
})

router.post('/getSingleEvent/:id', async (req,res,next)=>{
  try{
    let event = await Events.findById(req.params.id).populate('location').populate('owner').populate('attendees').populate('discussion').populate({ path: 'discussion', populate: { path: 'participants' } }).populate({path: 'discussion', populate: {path: 'messages'}}).populate({path: 'discussion', populate: {path: 'messages', populate: {path: 'createdBy'}}})
    if(event.discussion.messages.length > 0){
      event = await Events.findById(req.params.id).populate('location').populate('owner').populate('attendees').populate('discussion').populate({ path: 'discussion', populate: { path: 'participants' } }).populate({path: 'discussion', populate: {path: 'messages'}}).populate({path: 'discussion', populate: {path: 'messages', populate: {path: 'createdBy'}}})
    }
    // console.log(event)
    let alreadyAttending = false;
    // const checkIfAttending = await Events.find({$and: [{_id: req.params.id}, {attendees: {$contains: req.body.user_id}}]})
    // if(checkIfAttending){
    //   alreadyAttending = true;
    // }
    event.attendees.forEach((eachPerson)=>{
      if(eachPerson._id.equals(req.body.user_id)){
        alreadyAttending = true;
      }
    })
    res.json({event: event, attending: alreadyAttending});
  }catch(err){
    res.json(err)
  }
})

router.get('/getEvents/:id', async (req,res,next)=>{
try{
    const user = await User.findById(req.params.id)
    const allEvents = await Events.find().populate('location').populate('owner');
    let eventsForUser = [];
    // if(req.user){
      let geoResult = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${user.acquaintedCity}&key=${process.env.GEOCODE}`);
      // console.log(geoResult)
      if(req.body.zip){
        geoResult = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${zip}&key=${process.env.GEOCODE}`);
      }

    // console.log(geoResult)
    // console.log('---------------------------------------')
    // console.log(allEvents[0].location)
allEvents.forEach((eachEvent)=>{
  if(eachEvent.location.lat - geoResult.data.results[0].geometry.lat <= 2 &&  eachEvent.location.lat - geoResult.data.results[0].geometry.lat >= -2 && eachEvent.location.lng - geoResult.data.results[0].geometry.lng <= 2 && eachEvent.location.lng - geoResult.data.results[0].geometry.lng >=-2){
    eventsForUser.push(eachEvent)
  }
})
res.json(eventsForUser)
}catch(err){
  res.json(err)
}
})

router.post('/attendEvent',async (req,res,next)=>{
  try{  
    // console.log(req.body)
    // console.log(req.user)
    console.log('testing')
    if(req.body.attending){
      const event = await Events.findByIdAndUpdate(req.body.eventId,{$pull: {attendees: req.user._id}}).populate('location').populate('owner').populate('attendees').populate('discussion').populate({ path: 'discussion', populate: { path: 'participants' } }).populate({path: 'discussion', populate: {path: 'messages'}}).populate({path: 'discussion', populate: {path: 'messages', populate: {path: 'createdBy'}}})
      const user = await User.findByIdAndUpdate(req.user._id,{$pull: {upcomingEvents: req.body.eventId}})
    //  console.log(event);
      res.json(event)
    }else{
      const event = await Events.findByIdAndUpdate(req.body.eventId,{$push: {attendees: req.user._id}}, {new: true}).populate('location').populate('owner').populate('attendees').populate('discussion').populate({ path: 'discussion', populate: { path: 'participants' } }).populate({path: 'discussion', populate: {path: 'messages'}}).populate({path: 'discussion', populate: {path: 'messages', populate: {path: 'createdBy'}}})
      const user = await User.findByIdAndUpdate(req.user._id,{$push: {upcomingEvents: req.body.eventId}})
      res.json(event)
    }
  }catch(err){
    res.json(err)
  }
})
router.post('/postToForum/:id', async (req,res,next)=>{
  try{
    const newMessage = new Message({
      body: req.body.message,
      createdBy: req.user
    })
    newMessage.save()
    const eventToGet = await Events.findById(req.params.id)
    let idOfDiscussion = eventToGet.discussion;
    const discussion = await Chat.findByIdAndUpdate(idOfDiscussion,{$push: {messages: newMessage}})
    if(!discussion.participants.includes(req.user._id)){
      const updateParticipants =  await Chat.findByIdAndUpdate(idOfDiscussion,{$push: {participants: req.user._id}})
    }
    const event = await Events.findById(req.params.id).populate('location').populate('owner').populate('attendees').populate('discussion').populate({ path: 'discussion', populate: { path: 'participants' } }).populate({path: 'discussion', populate: {path: 'messages'}}) .populate({path: 'discussion', populate: {path: 'messages', populate: {path: 'createdBy'}}})
    res.json(event)
  }catch(err){
    res.json(err)
  }
})

module.exports = router;
