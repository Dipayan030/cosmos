import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export const adminAuth =  async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({ message: "No token provided, authorization denied" });
        };
        const token = authHeader.split(' ')[1];
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            return res.status(401).json({ message: "Invalid or expired token" });
        };
        const dbUser = await usersModel.findByID(user.id);
        if(!dbUser || !dbUser[0]){
            return res.status(404).json({ message: "User account not found in system" });
        };
        if(dbUser[0].role!=='admin'){
            return res.status(403).json({ message: "Access denied. Admin privileges required" });
        };
        req.user = dbUser;
        next();
    } catch(err) {
        console.error("Admin Auth Middleware Error:", err);
    }
}