var bcrypt = require('bcrypt');
module.exports = function(sequelize,DataTypes){
	var User = sequelize.define("User",{
		id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
		username:{
			type:DataTypes.STRING(64),
			set(val){
				this.setDataValue('username',val.trim().replace(' ','').toLowerCase());
			},
			unique:true
		},
		password:{
			type:DataTypes.STRING(60),
		},
		email:{
			type:DataTypes.STRING(254),
			validate:{
				isEmail:true,				
				notEmpty:true
			},
			set(val){
				this.setDataValue('email',val.trim().toLowerCase());
			},
			unique:true
		}
	});
	User.beforeCreate((user,options)=>{
		if (user.changed('password')){
			return bcrypt.hash(user.password,11).then((hash,err)=>{
				user.password= hash;
			})
		}		
	});

	return User;
}