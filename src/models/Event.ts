import Category from './Category';

interface Event {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    category: Category;
}

export default Event;
