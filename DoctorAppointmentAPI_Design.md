
# Doctor Appointment API Design (C#)

## Overview
This document outlines the architecture and endpoints for a C# API to support a doctor appointment system. The API will be built using ASP.NET Core and will provide endpoints for authentication, doctor information, appointment management, and statistics.

## Technology Stack
- ASP.NET Core 7.0 or later
- Entity Framework Core for data access
- SQL Server for the database
- JWT for authentication
- Swagger for API documentation

## Project Structure

```
DoctorAppointmentAPI/
├── Controllers/
│   ├── AuthController.cs
│   ├── DoctorsController.cs
│   ├── AppointmentsController.cs
│   ├── StatisticsController.cs
├── Models/
│   ├── Doctor.cs
│   ├── User.cs
│   ├── Appointment.cs
│   ├── TimeSlot.cs
│   ├── Statistics/
│   │   ├── AppointmentStatistics.cs
│   │   ├── PatientStatistics.cs
├── DTOs/
│   ├── LoginDto.cs
│   ├── RegisterDto.cs
│   ├── AppointmentDto.cs
│   ├── AppointmentFormDto.cs
│   ├── UserDto.cs
│   ├── DoctorDto.cs
├── Services/
│   ├── AuthService.cs
│   ├── DoctorService.cs
│   ├── AppointmentService.cs
│   ├── StatisticsService.cs
├── Data/
│   ├── ApplicationDbContext.cs
│   ├── Repositories/
│   │   ├── DoctorRepository.cs
│   │   ├── UserRepository.cs
│   │   ├── AppointmentRepository.cs
├── Middleware/
│   ├── JwtMiddleware.cs
│   ├── ErrorHandlingMiddleware.cs
├── Helpers/
│   ├── AutoMapperProfile.cs
│   ├── JwtUtils.cs
├── Program.cs
├── appsettings.json
```

## Database Schema

### Users Table
```sql
CREATE TABLE Users (
    Id NVARCHAR(36) PRIMARY KEY,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Role NVARCHAR(20) NOT NULL,
    DateOfBirth DATE NULL,
    Phone NVARCHAR(20) NULL,
    Address NVARCHAR(200) NULL,
    ProfileImage NVARCHAR(MAX) NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
```

### Doctors Table
```sql
CREATE TABLE Doctors (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId NVARCHAR(36) NULL FOREIGN KEY REFERENCES Users(Id),
    Name NVARCHAR(100) NOT NULL,
    Specialty NVARCHAR(100) NOT NULL,
    Image NVARCHAR(MAX) NULL,
    Rating DECIMAL(3,2) NULL,
    Experience INT NULL,
    About NVARCHAR(MAX) NULL
);
```

### Appointments Table
```sql
CREATE TABLE Appointments (
    Id NVARCHAR(36) PRIMARY KEY,
    PatientId NVARCHAR(36) NOT NULL FOREIGN KEY REFERENCES Users(Id),
    DoctorId INT NOT NULL FOREIGN KEY REFERENCES Doctors(Id),
    Date DATE NOT NULL,
    Time NVARCHAR(10) NOT NULL,
    Reason NVARCHAR(MAX) NOT NULL,
    Status NVARCHAR(20) NOT NULL,
    Notes NVARCHAR(MAX) NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
```

### TimeSlots Table
```sql
CREATE TABLE TimeSlots (
    Id INT PRIMARY KEY IDENTITY(1,1),
    DoctorId INT NOT NULL FOREIGN KEY REFERENCES Doctors(Id),
    Date DATE NOT NULL,
    Time NVARCHAR(10) NOT NULL,
    Available BIT NOT NULL DEFAULT 1,
    CONSTRAINT UC_TimeSlot UNIQUE (DoctorId, Date, Time)
);
```

## API Endpoints

### Authentication API

#### Register a new user
- **Endpoint**: POST /api/auth/register
- **Request Body**: RegisterDto
- **Response**: { user: UserDto, token: string }

#### Login
- **Endpoint**: POST /api/auth/login
- **Request Body**: LoginDto
- **Response**: { user: UserDto, token: string }

#### Logout
- **Endpoint**: POST /api/auth/logout
- **Authorization**: Bearer Token
- **Response**: 200 OK

#### Get Current User
- **Endpoint**: GET /api/auth/me
- **Authorization**: Bearer Token
- **Response**: UserDto

### Doctors API

#### Get All Doctors
- **Endpoint**: GET /api/doctors
- **Response**: Doctor[]

#### Get Doctor by ID
- **Endpoint**: GET /api/doctors/{id}
- **Response**: Doctor

#### Get Doctors by Specialty
- **Endpoint**: GET /api/doctors/specialty/{specialty}
- **Response**: Doctor[]

#### Get Available Time Slots
- **Endpoint**: GET /api/doctors/{id}/timeslots
- **Query Parameters**: date (optional)
- **Response**: TimeSlot[]

### Appointments API

#### Get All Appointments (for current user)
- **Endpoint**: GET /api/appointments
- **Authorization**: Bearer Token
- **Query Parameters**: status (optional)
- **Response**: Appointment[]

#### Get Appointment by ID
- **Endpoint**: GET /api/appointments/{id}
- **Authorization**: Bearer Token
- **Response**: Appointment

#### Create Appointment
- **Endpoint**: POST /api/appointments
- **Authorization**: Bearer Token
- **Request Body**: AppointmentFormDto
- **Response**: Appointment

#### Update Appointment Status
- **Endpoint**: PUT /api/appointments/{id}/status
- **Authorization**: Bearer Token
- **Request Body**: { status: string, notes: string }
- **Response**: Appointment

#### Cancel Appointment
- **Endpoint**: PUT /api/appointments/{id}/cancel
- **Authorization**: Bearer Token
- **Response**: 200 OK

### Statistics API

#### Get Appointment Statistics
- **Endpoint**: GET /api/statistics/appointments
- **Authorization**: Bearer Token
- **Response**: AppointmentStatistics

#### Get Patient Statistics
- **Endpoint**: GET /api/statistics/patients
- **Authorization**: Bearer Token
- **Response**: PatientStatistics

## C# Model Examples

### User.cs
```csharp
public class User
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Role { get; set; } // "patient", "doctor", "admin"
    public DateTime? DateOfBirth { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public string ProfileImage { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public virtual ICollection<Appointment> Appointments { get; set; }
}
```

### Doctor.cs
```csharp
public class Doctor
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public string Name { get; set; }
    public string Specialty { get; set; }
    public string Image { get; set; }
    public decimal Rating { get; set; }
    public int Experience { get; set; }
    public string About { get; set; }
    
    // Navigation properties
    public virtual User User { get; set; }
    public virtual ICollection<Appointment> Appointments { get; set; }
    public virtual ICollection<TimeSlot> TimeSlots { get; set; }
}
```

### Appointment.cs
```csharp
public class Appointment
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string PatientId { get; set; }
    public int DoctorId { get; set; }
    public DateTime Date { get; set; }
    public string Time { get; set; }
    public string Reason { get; set; }
    public string Status { get; set; } // "pending", "approved", "rejected", "completed", "canceled"
    public string Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public virtual User Patient { get; set; }
    public virtual Doctor Doctor { get; set; }
}
```

### TimeSlot.cs
```csharp
public class TimeSlot
{
    public int Id { get; set; }
    public int DoctorId { get; set; }
    public DateTime Date { get; set; }
    public string Time { get; set; }
    public bool Available { get; set; } = true;
    
    // Navigation properties
    public virtual Doctor Doctor { get; set; }
}
```

## Controller Examples

### AuthController.cs
```csharp
[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserResponseDto>> Register(RegisterDto registerDto)
    {
        var result = await _authService.RegisterAsync(registerDto);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserResponseDto>> Login(LoginDto loginDto)
    {
        var result = await _authService.LoginAsync(loginDto);
        return Ok(result);
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await _authService.LogoutAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        return Ok();
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var user = await _authService.GetUserAsync(userId);
        return Ok(user);
    }
}
```

### AppointmentsController.cs
```csharp
[ApiController]
[Route("api/appointments")]
[Authorize]
public class AppointmentsController : ControllerBase
{
    private readonly IAppointmentService _appointmentService;

    public AppointmentsController(IAppointmentService appointmentService)
    {
        _appointmentService = appointmentService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetAppointments([FromQuery] string status = null)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var appointments = await _appointmentService.GetAppointmentsAsync(userId, status);
        return Ok(appointments);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AppointmentDto>> GetAppointment(string id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var appointment = await _appointmentService.GetAppointmentByIdAsync(id, userId);
        return Ok(appointment);
    }

    [HttpPost]
    public async Task<ActionResult<AppointmentDto>> CreateAppointment(AppointmentFormDto appointmentDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var appointment = await _appointmentService.CreateAppointmentAsync(appointmentDto, userId);
        return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointment);
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles = "doctor,admin")]
    public async Task<ActionResult<AppointmentDto>> UpdateAppointmentStatus(string id, [FromBody] UpdateStatusDto updateDto)
    {
        var appointment = await _appointmentService.UpdateAppointmentStatusAsync(id, updateDto.Status, updateDto.Notes);
        return Ok(appointment);
    }

    [HttpPut("{id}/cancel")]
    public async Task<ActionResult> CancelAppointment(string id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        await _appointmentService.CancelAppointmentAsync(id, userId);
        return Ok();
    }
}
```

## Service Implementation Example

### AppointmentService.cs
```csharp
public class AppointmentService : IAppointmentService
{
    private readonly IAppointmentRepository _appointmentRepository;
    private readonly IUserRepository _userRepository;
    private readonly IDoctorRepository _doctorRepository;
    private readonly IMapper _mapper;

    public AppointmentService(
        IAppointmentRepository appointmentRepository,
        IUserRepository userRepository,
        IDoctorRepository doctorRepository,
        IMapper mapper)
    {
        _appointmentRepository = appointmentRepository;
        _userRepository = userRepository;
        _doctorRepository = doctorRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<AppointmentDto>> GetAppointmentsAsync(string userId, string status = null)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        
        IEnumerable<Appointment> appointments;
        
        if (user.Role == "patient")
        {
            appointments = await _appointmentRepository.GetByPatientIdAsync(userId, status);
        }
        else if (user.Role == "doctor")
        {
            var doctor = await _doctorRepository.GetByUserIdAsync(userId);
            appointments = await _appointmentRepository.GetByDoctorIdAsync(doctor.Id, status);
        }
        else
        {
            appointments = await _appointmentRepository.GetAllAsync(status);
        }
        
        return _mapper.Map<IEnumerable<AppointmentDto>>(appointments);
    }

    public async Task<AppointmentDto> GetAppointmentByIdAsync(string id, string userId)
    {
        var appointment = await _appointmentRepository.GetByIdAsync(id);
        var user = await _userRepository.GetByIdAsync(userId);
        
        if (appointment == null)
        {
            throw new NotFoundException("Appointment not found");
        }
        
        // Check if user has permission to view this appointment
        if (user.Role == "patient" && appointment.PatientId != userId)
        {
            throw new ForbiddenException("You don't have permission to view this appointment");
        }
        
        if (user.Role == "doctor")
        {
            var doctor = await _doctorRepository.GetByUserIdAsync(userId);
            if (appointment.DoctorId != doctor.Id)
            {
                throw new ForbiddenException("You don't have permission to view this appointment");
            }
        }
        
        return _mapper.Map<AppointmentDto>(appointment);
    }

    public async Task<AppointmentDto> CreateAppointmentAsync(AppointmentFormDto appointmentDto, string userId)
    {
        var patient = await _userRepository.GetByIdAsync(userId);
        
        if (patient == null || patient.Role != "patient")
        {
            throw new ForbiddenException("Only patients can create appointments");
        }
        
        var doctor = await _doctorRepository.GetByIdAsync(appointmentDto.DoctorId);
        
        if (doctor == null)
        {
            throw new NotFoundException("Doctor not found");
        }
        
        // Check if time slot is available
        var isAvailable = await _doctorRepository.IsTimeSlotAvailableAsync(
            appointmentDto.DoctorId, 
            appointmentDto.Date, 
            appointmentDto.Time);
            
        if (!isAvailable)
        {
            throw new BadRequestException("The selected time slot is not available");
        }
        
        var appointment = new Appointment
        {
            PatientId = userId,
            DoctorId = appointmentDto.DoctorId,
            Date = DateTime.Parse(appointmentDto.Date),
            Time = appointmentDto.Time,
            Reason = appointmentDto.Reason,
            Status = "pending"
        };
        
        await _appointmentRepository.AddAsync(appointment);
        
        // Mark time slot as unavailable
        await _doctorRepository.UpdateTimeSlotAvailabilityAsync(
            appointmentDto.DoctorId, 
            appointmentDto.Date, 
            appointmentDto.Time, 
            false);
            
        return _mapper.Map<AppointmentDto>(appointment);
    }

    public async Task<AppointmentDto> UpdateAppointmentStatusAsync(string id, string status, string notes)
    {
        var appointment = await _appointmentRepository.GetByIdAsync(id);
        
        if (appointment == null)
        {
            throw new NotFoundException("Appointment not found");
        }
        
        appointment.Status = status;
        
        if (!string.IsNullOrEmpty(notes))
        {
            appointment.Notes = notes;
        }
        
        await _appointmentRepository.UpdateAsync(appointment);
        
        return _mapper.Map<AppointmentDto>(appointment);
    }

    public async Task CancelAppointmentAsync(string id, string userId)
    {
        var appointment = await _appointmentRepository.GetByIdAsync(id);
        var user = await _userRepository.GetByIdAsync(userId);
        
        if (appointment == null)
        {
            throw new NotFoundException("Appointment not found");
        }
        
        // Check if user has permission to cancel this appointment
        if (user.Role == "patient" && appointment.PatientId != userId)
        {
            throw new ForbiddenException("You don't have permission to cancel this appointment");
        }
        
        if (user.Role == "doctor")
        {
            var doctor = await _doctorRepository.GetByUserIdAsync(userId);
            if (appointment.DoctorId != doctor.Id)
            {
                throw new ForbiddenException("You don't have permission to cancel this appointment");
            }
        }
        
        appointment.Status = "canceled";
        await _appointmentRepository.UpdateAsync(appointment);
        
        // Mark time slot as available again
        await _doctorRepository.UpdateTimeSlotAvailabilityAsync(
            appointment.DoctorId, 
            appointment.Date.ToString("yyyy-MM-dd"), 
            appointment.Time, 
            true);
    }
}
```

## Deployment and Integration Steps

1. **Create a new ASP.NET Core Web API project** using Visual Studio or the .NET CLI.
2. **Set up entity models** according to the designs above.
3. **Configure Entity Framework Core** with SQL Server and create migrations.
4. **Implement repositories and services** for data access and business logic.
5. **Set up JWT authentication** for secure endpoints.
6. **Develop API controllers** following the REST principles outlined above.
7. **Configure CORS** to allow your React frontend to communicate with the API.
8. **Implement error handling middleware** for consistent API responses.
9. **Add Swagger documentation** for easy API exploration.
10. **Deploy the API** to Azure App Service or another cloud hosting provider.

## Frontend Integration

Update your React frontend to use the C# API instead of mock data:

1. Update the `API_BASE_URL` in `types.ts` to point to your deployed API.
2. Configure CORS on the API to allow requests from your frontend domain.
3. Modify the frontend components to handle loading states and API errors.
4. Store JWT tokens securely using local storage or cookies.
5. Implement login/logout functionality using the auth API endpoints.
