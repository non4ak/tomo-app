const supabase = require("../supbase-server");

const getLibraryBooks = async () => {
    const { data, error } = await supabase.from("saved_books").select("*");
    if (error) throw error;
    return data;
};

const addBookToLibrary = async (volume_id, title, coverUrl) => {
    const { data: existingBooks, error: selectError } = await supabase
        .from("saved_books")
        .select("*")
        .eq("volume_id", volume_id)
        .limit(1);

    if (selectError) throw selectError;
    if (existingBooks.length > 0) {
        throw new Error("Book already exists in library");
    }

    const { error: insertError } = await supabase
        .from("saved_books")
        .insert([{ volume_id, title, coverUrl }]);

    if (insertError) throw insertError;
};

const deleteBookFromLibrary = async (id) => {
    const { error } = await supabase
        .from("saved_books")
        .delete()
        .eq("volume_id", id);
    
    if (error) throw error;
};

module.exports = {
    getLibraryBooks,
    addBookToLibrary,
    deleteBookFromLibrary
};
