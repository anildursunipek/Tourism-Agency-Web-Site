using AutoMapper;
using Tourism_Agency_AspNet_Web_Api.DTO;
using Tourism_Agency_AspNet_Web_Api.Models;

namespace Tourism_Agency_AspNet_Web_Api.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Tour, TourDto>();
            CreateMap<TourDto, Tour>();
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<TourItem, TourItemDto>();
            CreateMap<TourItemDto, TourItem>();
        }
    }
}
