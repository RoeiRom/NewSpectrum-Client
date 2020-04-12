interface HebrewDate {
    hebrew: string;
    date: Date;
    title: string;
    yomtov? : true;
    category: string;
    subcat?: string;
}

export default HebrewDate;
