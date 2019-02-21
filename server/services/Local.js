const LocalStratergy = require('passport-local').Strategy
const bcrypt = require('bcryptjs');
module.exports = (passport, User) => {
    passport.use('local-signin',new LocalStratergy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        }, async function(req, username, password, done){
            const existingUsers = await User.findOne({username: username})
            if(!existingUsers){
                console.log('Incorrect Username');
                done(null,false, { message: 'Incorrect username'});
            }
            let res = await bcrypt.compare(password,existingUsers.password)
            if(res){
                done(null,existingUsers);
            }else{
                console.log('Incorrect Password');
                done(null,false,{ message: 'Incorrect password'} )
            }
            
        }
    )
    );

    passport.use('local-signup',new LocalStratergy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        }, async function(request, username, password, done){
            const social = request.body.social
            if(social === 'Google'){
                try{
                const user = await User.findOne({'google.id': request.body.id});
                if(user){
                    console.log('User exists',user)
                    done(null,false,{success: false, message: 'Account already exists'});
                }else{
                    console.log(request.body);
                    const newUser = await new User({
                        google: {
                            id: request.body.id,
                            token: request.body.socialToken
                        },
                        email: request.body.email,
                        username: request.body.username,
                        name: request.body.name
                    })

                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(request.body.password,salt);
                    newUser.password = hash;
                    console.log('New user',newUser);
                    newUser.save();
                    done(null,newUser,{success: true, message: 'Account Created'});
                }
                }catch(error){
                    console.log(error);
                    done(error);
                }
            }else if (social === 'Facebook'){
                try{
                    console.log(`ID is ${request.body.id}`);
                    const user = await User.findOne({'facebook.id': request.body.id});
                    if(user){
                        console.log('User exists',user)
                        done(null,false,{message: 'Facebook Account already exists'});
                    }else{
                        console.log(request.body);
                        const newUser = await new User({
                            facebook: {
                                id: request.body.id,
                                token: request.body.socialToken
                            },
                            email: request.body.email,
                            username: request.body.username,
                            name: request.body.name
                        })
    
                        const salt = await bcrypt.genSalt(10);
                        const hash = await bcrypt.hash(request.body.password,salt);
                        newUser.password = hash;
                        console.log('New user',newUser);
                        newUser.save();
                        console.log('Saved user');
                        done(null,newUser);
                    }
                    }catch(error){
                        console.log(error);
                        done(error);
                    }

            }else{
                const existingUser = await User.findOne({username: username})
                if(existingUser){
                    done(null,false, { message: 'Username already exists'});
                }
                const user = await new User();
                user.email = req.body.email;
                user.username = username;
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password,salt);
                user.password = hash; 
                user.name = req.body.name;
                user.save();   
                done(null,user);
            }

        }
    )
    )
}