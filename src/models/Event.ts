import Category from './Category';

interface Event {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    isAllDay: boolean;
    category: Category;
}

export default Event;
