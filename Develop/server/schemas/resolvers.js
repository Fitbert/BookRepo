const { saveBook } = require("../controllers/user-controller");
const { User, Book} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log(context.user)
            if (context.user) {return User.findOne({ _id: context.user._id});
        }
        throw new Error("Not found");
            },
    },

    Mutation: {
        login: async (parent, args) => {
            const user = await User.findOne({ email: args.email });
            if (!user) {
                throw new Error("No such user found");
            }
            const isCorrectPassword = await user.isCorrectPassword(args.password);
            console.log(isCorrectPassword);
            if (!isCorrectPassword) {
                throw new Error("Incorrect password");
            }
           
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveBookBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate({
                    _id: context.user._id
                },
            {
                $push: { 
                    savedBooks: args.input 
            },
        },
        {new: true}
    );
    return updatedUser;
}
throw new Error("You need to be logged in!");
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate({
                    _id: context.user._id
                },
            {
                $pull: { 
                    savedBooks: {
                        bookId: args.bookId 
            }
        },
    },
    {new:true}

        );
        return updatedUser;
            }
        throw new Error("You need to be logged in!");
        },
    },
    };
module.exports = resolvers;