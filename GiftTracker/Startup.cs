using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.IdentityModel.Tokens;
using GiftTracker.DataAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace GiftTracker
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddTransient<UserRepository>();
            services.AddTransient<ExchangePartnerRepository>();
            services.AddTransient<InterestRepository>();
            services.AddTransient<OccasionRepository>();
            services.AddTransient<WishListItemRepository>();
            services.AddTransient<GiveItemRepository>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)

                           .AddJwtBearer(options =>
                           {
                               options.IncludeErrorDetails = true;
                               options.Authority = "https://securetoken.google.com/lll-emporium";
                               options.TokenValidationParameters = new TokenValidationParameters
                               {
                                   ValidateLifetime = true,
                                   ValidateAudience = true,
                                   ValidateIssuer = true,
                                   ValidAudience = "lll-emporium",
                                   ValidIssuer = "https://securetoken.google.com/lll-emporium"
                               };
                           });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "GiftTracker", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "GiftTracker v1"));
            }
            
            app.UseCors(cfg => cfg.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
