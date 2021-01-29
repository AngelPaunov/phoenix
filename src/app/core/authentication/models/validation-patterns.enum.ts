export enum ValidationPatterns {
    Name="^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$",
    Email="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
    Password='(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}',
}
